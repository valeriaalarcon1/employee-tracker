-- database --
DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employee_db;

USE employee_db;



-- tables --
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name TEXT NOT NULL,
    PRIMARY KEY (id)
); 

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title TEXT NOT NULL,
    department INT,
    FOREIGN KEY (department) REFERENCES department(id) ON DELETE SET NULL,
    salary INT,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    title INT,
    FOREIGN KEY (role) REFERENCES role(id) ON DELETE SET NULL,
    department INT,
    salary INT,
    manager TEXT NOT NULL,
    PRIMARY KEY (id)
);