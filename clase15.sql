create database pwi;
use pwi;
use alumnos;


-- creacion de la tabla alumnos --
create table alumnos(
alumnoId int unsigned not null auto_increment primary key,
nombre varchar(50) not null,
apellido varchar(50) not null,
telefono varchar(50),
fechaNac date, 
saldo float,
edad smallint
);
-- insertamos mas datos con una sola sentencia de query --
insert into alumnos (alumnoId, nombre, apellido, telefono, fechaNac, saldo, edad) values 
(null, "Pedro", "Perez", "123456", "2000-12-25", 52.25, 25),
(null, "Pedro", "Perez", "123456", "2000-12-25", 52.25, 25), 
(null, "Pedro", "Perez", "123456", "2000-12-25", 52.25, 25),
(null, "Pedro", "Perez", "123456", "2000-12-25", 52.25, 25);

-- where --
select nombre from alumnos where alumnoId = 3;

-- mirar query (no me funciono messi) --
select * from alumnos where nombre = "Pedro" and apellido = "Messi";

select nombre, apellido from alumnos where alumnoId = 2 or alumnoId = 4;

-- agregamos datos a la busqueda --
select * from alumnos where alumnoId = 2 and alumnoId = 4;

-- like --
select * from alumnos where apellido like 'messi%';
select * from alumnos where edad like 20;

-- between : entre valores dados --
select * from alumnos where edad between 20 and 23;

-- listas --
select * from alumnos where alumnoId in (1, 5, 7);

-- borrar --
delete from alumnos where alumnoId = 4;
delete from alumnos where apellido = "Messi";

-- actualizaciones --
update alumnos  set saldo = saldo * 0.2;
update alumnos set saldo = saldo * 0.5 where alumnoId = 5;

/*
Operadores relacionales en SQL
< menor
> mayor
<= menor o igual
>= mayor o igual
<> distinto a
*/


