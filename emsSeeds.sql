USE emsDB;

INSERT INTO department (dept_name)
VALUES ("Sales");

INSERT INTO department (dept_name)
VALUES ("Human Resource");

INSERT INTO department (dept_name)
VALUES ("Production");


INSERT INTO role (title, salary, dept_id)
VALUES ("Manager", 1000.00,1);

INSERT INTO role (title, salary, dept_id)
VALUES ("Intern", 200.00,1);

INSERT INTO role (title, salary, dept_id)
VALUES ("Manager", 250.00,2);

INSERT INTO role (title, salary, dept_id)
VALUES ("Team Lead", 250.00,3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Tom","Samuel", 1);

INSERT INTO employee (first_name, last_name, role_id,manager_id)
VALUES ("Deena","Arun", 2,1);