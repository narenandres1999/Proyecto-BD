create table Genero (
sexo varchar not null,
genID serial primary key 
);

create table Paciente (
	cod_paciente integer,
	nombre varchar not null,
	genID integer,
	telefono varchar,
	eliminado boolean default false,
	primary key(cod_paciente),
	foreign key (genID) references Genero(genID)
);

create table Consultas(
	num_consulta serial,
	encargado varchar not null,
	motivo varchar,
	fecha_consulta date not null,
	borrar boolean default false,
	cod_paciente integer,
	primary key(num_consulta),
	foreign key(cod_paciente) references Paciente(cod_paciente)
);
create table Medicamentos(
	id_med serial primary key,
	cod_med varchar not null,
	med_nombre varchar not null,
	fecha_ven date,
	stock integer check (cantidad >= 0),
	borrado boolean default false
);

create table Cons_Med(
	id_med integer,
	num_consulta integer,
	cantidad integer check (cantidad >= 0),
	primary key (id_med,num_consulta),
	foreign key (id_med) references Medicamentos(id_med),
	foreign key (num_consulta) references Consultas(num_consulta)
);