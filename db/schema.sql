-- database --
DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employee_db;

USE employee_db;



-- tables --
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
); 

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department) REFERENCES department(id) ON DELETE SET NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    FOREIGN KEY (role) REFERENCES role(id) ON DELETE SET NULL,
    manager_id INT NOT NULL,
    PRIMARY KEY (id)
);