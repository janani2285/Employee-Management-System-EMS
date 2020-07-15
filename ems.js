const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

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
            choices: ["Add New Department", "View Departments", "Add New Role", "View Roles", "Add New Employee", "View Employee", "Update Employee Role", "Exit"],
            name: "userChoice"
        }
    ]);
    switch (answers.userChoice) {
        case "Add New Department":
            addNewDept();
            break;
        case "View Departments":
            viewDept();
            break;
        case "Add New Role":
            addNewRole();
            break;
        case "View Roles":
            viewRole();
            break;
        case "Add New Employee":
            addNewEmp();
            break;
        case "View Employee":
            viewEmp();
            break;
        case "Update Employee Role":
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
    connection.query(selectQueryRole, function (err, res) {
        if (err) {
            console.log("ERROR occurred while retriving Role data from database. " + err);
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
        } else {
            console.table(res);
        }
        mainMenu();
    });
}