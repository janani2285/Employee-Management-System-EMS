const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

const ADD_DEPT = "Add New Department";
const VIEW_DEPT = "View Departments";
const ADD_ROLE = "Add New Role";
const VIEW_ROLE = "View Roles";
const ADD_EMP =  "Add New Employee";
const VIEW_EMP = "View Employee";
const UPDATE_EMP_ROLE = "Update Employee Role";
const EXIT =  "Exit";

const selectQueryDept = "SELECT * FROM department";
const insertQueryDept = "INSERT INTO department SET dept_name=?";
const selectQueryRole =  "SELECT * FROM role";
const selectQueryEmp = "SELECT * FROM employee";

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "emsDB",
});

connection.connect((err) => {
    if (err) {
        console.log("ERROR connecting to database. " + err);
       // process.exit(0); //CHECK
    }
    console.log("connected as id " + connection.threadId);
    mainMenu();
});

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
            console.log("ERROR occurred during inserting new department into database. " + err);
            connection.end();
        } else {
            console.log(`SUCCESS!!!! ${answers.newDeptName} has been added to department table`);
        }
        mainMenu();
    });
}



function viewDept() {

    connection.query(selectQueryDept, function (err, res) {
        if (err) {
            console.log("ERROR occurred while retriving department data from database. " + err);
            connection.end();
        } else {
            console.table(res);
        }
        mainMenu();
    });
}

function addNewRole() {
    connection.query(selectQueryDept, function (err, res) {
        if (err) {
            console.log("Adding new role - ERROR occurred while retriving department data from database. " + err);
            connection.end();
        } else {
            const deptArray = res.map((row) => row.dept_name);
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
               
                 const query = "INSERT INTO role SET title=?, salary=?, dept_id=(SELECT dept_id from department WHERE dept_name = ?)";

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
            console.log("ERROR occurred while retriving Role data from database. " + err);
            connection.end();
        } else {
            console.table(res);
        }
        mainMenu();
    });
}

function viewEmp(){
    connection.query(selectQueryEmp, function (err, res) {
        if (err) {
            console.log("ERROR occurred while retriving Employee data from database. " + err);
            connection.end();
        } else {
            console.table(res);
        }
        mainMenu();
    });
}

function addNewEmp(){

}