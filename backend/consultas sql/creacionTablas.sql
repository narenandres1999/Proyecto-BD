create sequence serial_consulta start with 1 increment by 1;
create sequence serial_med start with 1 increment by 1;

create table Paciente (
	cod_paciente integer,
	nombre varchar not null,
	genero varchar,
	telefono varchar,
	eliminado boolean default false,
	primary key(cod_paciente)
);

create table Consultas(
	num_consulta integer default nextval('serial_consulta'),
	encargado varchar not null,
	motivo varchar,
	fecha_consulta date not null,
	borrar boolean default false,
	cod_paciente integer,
	primary key(num_consulta),
	foreign key(cod_paciente) references Paciente(cod_paciente)
);
create table Medicamentos(
	id_med integer primary key default nextval('serial_med'),
	cod_med varchar not null,
	med_nombre varchar not null,
	fecha_ven date,
	stock integer check (stock >= 0),
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