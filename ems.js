const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

//Constants for Menu
const ADD_DEPT = "Add New Department";
const VIEW_DEPT = "View Departments";
const ADD_ROLE = "Add New Role";
const VIEW_ROLE = "View Roles";
const ADD_EMP = "Add New Employee";
const VIEW_EMP = "View Employee";
const UPDATE_EMP_ROLE = "Update Employee Role";
const EXIT = "Exit";

//Constants for SQL query
const selectQueryDept = "SELECT * FROM department";
const insertQueryDept = "INSERT INTO department SET dept_name=?";
const selectQueryRole = "SELECT * FROM role";
const selectQueryEmp = "SELECT * FROM employee";

//Creating connection to database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "emsDB",
});

//Connecting to database
connection.connect((err) => {
    if (err) {
        console.log("ERROR connecting to database. " + err);
        // process.exit(0); //CHECK
    }
    console.log("connected as id " + connection.threadId);
    mainMenu();
});

//Displaying main menu and calling respective functions to process the user selection
async function mainMenu() {
    // console.log("Inside Main menu");
    const answers = await inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: [ADD_DEPT, VIEW_DEPT, ADD_ROLE, VIEW_ROLE, ADD_EMP, VIEW_EMP, UPDATE_EMP_ROLE, EXIT],
            name: "userChoice"
        }
    ]);
    switch (answers.userChoice) {
        case ADD_DEPT:
            addNewDept();
            break;
        case VIEW_DEPT:
            viewDept();
            break;
        case ADD_ROLE:
            addNewRole();
            break;
        case VIEW_ROLE:
            viewRole();
            break;
        case ADD_EMP:
            addNewEmp();
            break;
        case VIEW_EMP:
            viewEmp();
            break;
        case UPDATE_EMP_ROLE:
            updateEmpRole();
            break;
        case "Exit":
            connection.end();
            break;
    }
}

//Function to add new department
async function addNewDept() {
    const answers = await inquirer.prompt([
        {
            type: "input",
            message: "Enter the new department you like to add:",
            name: "newDeptName"
        },
    ]);
    connection.query(insertQueryDept, answers.newDeptName, function (err, res) {
        if (err) {
            console.log("Adding New Department- ERROR occurred during inserting new department into database. " + err);
            connection.end();
        } else {
            console.log(`SUCCESS!!!! ${answers.newDeptName} has been added to department table`);
        }
        mainMenu();
    });
}


//Function to view department
function viewDept() {
    connection.query(selectQueryDept, function (err, res) {
        if (err) {
            console.log("Viewing Department - ERROR occurred while retriving department data from database. " + err);
            connection.end();
        } else {
            console.table(res);
        }
        mainMenu();
    });
}

//Function to add new role
function addNewRole() {
    connection.query(selectQueryDept, function (err, res) {
        if (err) {
            console.log("Adding new role - ERROR occurred while retriving department data from database. " + err);
            connection.end();
        } else {
            const deptArray = [];
            res.forEach((row) => {
                deptArray.push({
                    name: row.dept_name,
                    value: row.dept_id
                });
            });
            const answers = inquirer.prompt([
                {
                    type: "input",
                    message: "Enter the new role you like to add:",
                    name: "newRole"
                },
                {
                    type: "input",
                    message: "Enter salary for the new role:",
                    name: "newSalary"
                },
                {
                    type: "list",
                    message: "Choose the department",
                    choices: deptArray,
                    name: "dept"
                }
            ]).then(answers => {

                const query = "INSERT INTO role SET title=?, salary=?, dept_id=?";

                connection.query(query, [answers.newRole, answers.newSalary, answers.dept], function (err, res) {
                    if (err) {
                        console.log("ERROR occurred during inserting new role into database. " + err);
                        connection.end();
                    } else {
                        console.log(`SUCCESS!!!! ${answers.newRole} role in ${answers.dept} department has been added to Role table with ${answers.newSalary} salary`);
                    }
                    mainMenu();
                });
            });
        }
    });
}

//Function to view Role
function viewRole(){
    const queryString = `
      SELECT
        role.role_id AS ID,
        role.title AS Title,
        role.salary AS Salary,
        department.dept_name AS Department
      FROM role
      INNER JOIN department ON role.dept_id = department.dept_id;
    `;
    connection.query(queryString, function (err, res) {
        if (err) {
            console.log("Viewing Role - ERROR occurred while retriving Role data from database. " + err);
            connection.end();
        } else {
            console.table(res);
        }
        mainMenu();
    });
}

//Function to add new employee
function addNewEmp() {
    connection.query(selectQueryRole, function (err, res) {
        if (err) {
            console.log("Adding new Employee - ERROR occurred while retriving role data from database. " + err);
            connection.end();
        } else {
            // console.log("res---",res);
            const roleArray = [];
            res.forEach((row) => {
                //    console.log("row.role_id---",row.role_id)
                roleArray.push({
                    name: row.title,
                    value: row.role_id
                });

            });
            connection.query(selectQueryEmp, function (err, res) {
                if (err) {
                    console.log("Adding new Employee - ERROR occurred while retriving employee data from database. " + err);
                    connection.end();
                } else {
                    const empArray = [];
                    res.forEach((row) => {
                        //    console.log("row.role_id---",row.role_id)
                        empArray.push({
                            name: row.first_name + " " + row.last_name,
                            value: row.emp_id
                        });

                    });
                    empArray.push({
                        name: "No Manager",
                        value: 0
                    });
                    //   console.log("empArray-",empArray);
                    const answers = inquirer.prompt([
                        {
                            type: "input",
                            message: "Enter the new employee's first name:",
                            name: "firstName"
                        },
                        {
                            type: "input",
                            message: "Enter the new employee's last name:",
                            name: "lastName"
                        },
                        {
                            type: "list",
                            message: "Choose the role",
                            choices: roleArray,
                            name: "role"
                        },
                        {
                            type: "list",
                            message: "Choose the manager",
                            choices: empArray,
                            name: "manager"
                        }
                    ]).then(answers => {
                        // console.log("value-",answers.role);
                        const query = "INSERT INTO employee SET first_name=?, last_name=?, role_id=?, manager_id=?";

                        connection.query(query, [answers.firstName, answers.lastName, answers.role, answers.manager], function (err, res) {
                            if (err) {
                                console.log("Add New Employee - ERROR occurred during inserting new employee into database. " + err);
                                connection.end();
                            } else {
                                console.log(`SUCCESS!!!! Employee, ${answers.firstName + " " + answers.lastName} in ${answers.dept} has been added to employee table`);
                            }
                            mainMenu();
                        });
                    });
                }
            });
        }
    });
}

//Function to view employee
function viewEmp() {
    const queryString = `
    SELECT
      emp.emp_id AS ID,
        CONCAT(emp.first_name, " ", emp.last_name) AS Name,
         CONCAT(manager.first_name, " ", manager.last_name) AS Manager,
        role.title AS Role,
        department.dept_name AS Department
      FROM employee emp
      LEFT JOIN employee manager 
       ON emp.manager_id = manager.emp_id
      INNER JOIN role ON emp.role_id = role.role_id
      INNER JOIN department ON role.dept_id = department.dept_id;
    `;
    connection.query(queryString, function (err, res) {
        if (err) {
            console.log("Viewing Employee - ERROR occurred while retriving Employee data from database. " + err);
            connection.end();
        } else {
            console.table(res);
        }
        mainMenu();
    });
}