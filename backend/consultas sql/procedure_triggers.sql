-- añade consultas con todas sus variantes
create or replace procedure addConsulta
(encar varchar,mot varchar,fecha date,cod integer,gen varchar,nom varchar,tele varchar)
as 
$consulta$										
begin
	if exists (select * from paciente where cod_paciente = cod) then
	update paciente set telefono = tele
	where cod_paciente = cod;
	insert into consultas(encargado,motivo,fecha_consulta,cod_paciente) values 
	(encar,mot,fecha,cod);
	else
	insert into paciente (cod_paciente,telefono,genero,nombre) values 
	(cod,tele,gen,nom);
	insert into consultas(encargado,motivo,fecha_consulta,cod_paciente) values 
	(encar,mot,fecha,cod);
	end if;
	commit;
end;
$consulta$ language plpgsql;

--trigger que descuenta automaticamente los medicamentos dados
create or replace function descontarStock() returns trigger as
$descontar$										
begin
	update medicamentos set stock = (stock - New.cantidad) where id_med = NEW.id_med;
return NEW;
end;
$descontar$ language plpgsql;

create or replace TRIGGER descuentaStock before INSERT on cons_med
for each row EXECUTE function descontarstock();

-- procedimiento que me actualiza una consulta
create or replace procedure update_consulta
(num integer,encar varchar,mot varchar,fecha date,cod integer,gen varchar,nom varchar,tele varchar)as 
$$
begin
	update consultas set encargado = encar,motivo = mot, fecha_consulta = fecha where num_consulta = num;
	update paciente set genero = gen,nombre = nom,telefono = tele where cod_paciente = cod;
commit;
end;
$$ language plpgsql;

--trigger que aumenta el stock cada vez que hago una eliminacion
create or replace function aumentarStock() returns trigger as
$aumentar$										
begin
	update medicamentos set stock = stock + (select cantidad from (cons_med natural join medicamentos) where id_med = OLD.id_med and num_consulta = OLD.num_consulta) 
	where id_med = OLD.id_med;
return OLD;
end;
$aumentar$ language plpgsql;

create or replace TRIGGER aumentar before DELETE on cons_med
for each row EXECUTE function aumentarStock();
