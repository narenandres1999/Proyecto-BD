
insert into medicamentos (cod_med,med_nombre,fecha_ven,stock) Values
('22020GB','Acetaminofen Tab','2023-07-02',20),
('22020GB','Acetaminofen Pastilla','2023-07-02',40);

insert into paciente (cod_paciente,telefono,genero,nombre) values
(2059393,3145454822,'Masculino','Naren Andres Medina Jaramillo'),
(2059383,3162719488,'Masculino','Juan David Rios');
insert into consultas (encargado,motivo,fecha_consulta,cod_paciente) values
('Pedrito','Dolor de cabeza','2022-05-28',2059393),
('Pedrito','Dolor de cabeza','2022-05-28',2059383);
insert into cons_med (id_med,num_consulta,cantidad) values
(1,1,1),
(2,2,5);