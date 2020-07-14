DROP DATABASE IF EXISTS emsDB;

CREATE DATABASE emsDB;

USE emsDB;

CREATE TABLE department (
  dept_id INT NOT NULL AUTO_INCREMENT,
  dept_name VARCHAR(30),
  PRIMARY KEY (dept_id)
);

CREATE TABLE role (
  role_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL(10,2),
  dept_id INT,
  PRIMARY KEY (role_id)
);

CREATE TABLE employee (
  emp_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT NULL,
  PRIMARY KEY (emp_id)
);