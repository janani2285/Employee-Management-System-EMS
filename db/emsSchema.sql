DROP DATABASE IF EXISTS emsDB;

CREATE DATABASE emsDB;

USE emsDB;

CREATE TABLE department (
  dept_id INT NOT NULL AUTO_INCREMENT,
  dept_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (dept_id)
);

CREATE TABLE role (
  role_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  dept_id INT NOT NULL,
  PRIMARY KEY (role_id),
  FOREIGN KEY (dept_id) REFERENCES department(dept_id)
);

CREATE TABLE employee (
  emp_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (emp_id),
   FOREIGN KEY (role_id) REFERENCES role(role_id)
);