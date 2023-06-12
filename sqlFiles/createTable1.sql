create schema employeeSystem;

use employeeSystem;

create table employees(
	id int NOT NULL primary key auto_increment,
    name varchar(15) not null,
    age int not null,
    country varchar(30) not null,
    position varchar(20) not null,
    Salary DECIMAL(10,2) not null
);