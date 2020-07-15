USE emsDB;
-- Department
INSERT INTO department (dept_name) VALUES ("Sales");

INSERT INTO department (dept_name) VALUES ("Human Resource");

INSERT INTO department (dept_name) VALUES ("Production");

INSERT INTO department (dept_name) VALUES ("Engineering");

-- INSERT INTO department (dept_name) VALUES ("Finance");

-- INSERT INTO department (dept_name) VALUES ("Legal");


-- Role
INSERT INTO role (title, salary, dept_id)
VALUES ("Sales Manager", 100000,1);

INSERT INTO role (title, salary, dept_id)
VALUES ("Sales Person", 50000,1);

INSERT INTO role (title, salary, dept_id)
VALUES ("HR Lead", 250000,2);

INSERT INTO role (title, salary, dept_id)
VALUES ("HR Intern", 25000,2);

INSERT INTO role (title, salary, dept_id)
VALUES ("Account Manager", 150000,4);

INSERT INTO role (title, salary, dept_id)
VALUES ("Accountant", 100000,4);

INSERT INTO role (title, salary, dept_id)
VALUES ("Team Lead", 150000,4);

INSERT INTO role (title, salary, dept_id)
VALUES ("Software Engineer ", 100000,4);


-- Employee
INSERT INTO employee (first_name, last_name, role_id,manager_id)
VALUES ("Tom","Samuel", 1,null);

INSERT INTO employee (first_name, last_name, role_id,manager_id)
VALUES ("Deena","Sue", 2,1);

INSERT INTO employee (first_name, last_name, role_id,manager_id)
VALUES ("Rebbaca","Travor", 3,null);

INSERT INTO employee (first_name, last_name, role_id,manager_id)
VALUES ("Rhonda","Higgns", 4,3);

INSERT INTO employee (first_name, last_name, role_id,manager_id)
VALUES ("Glenda","Samuel", 5,null);

INSERT INTO employee (first_name, last_name, role_id,manager_id)
VALUES ("Raj","Kumar", 6,5);

INSERT INTO employee (first_name, last_name, role_id,manager_id)
VALUES ("Vyas","Rajkumar", 7,null);

INSERT INTO employee (first_name, last_name, role_id,manager_id)
VALUES ("Tim","Giby", 8,7);