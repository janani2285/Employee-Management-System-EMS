const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");


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
   
    const query = "INSERT INTO department SET dept_name=?";
    connection.query(query, answers.newDeptName, function (err, res) {
      if (err) {
        console.log("ERROR occurred during inserting new department into database. " + err);
        }else{
            console.log(`SUCCESS!!!! ${answers.newDeptName} has been added to department table`);
        }
        mainMenu();
    });
}

function  viewDept(){
    const query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
      if (err) {
        console.log("ERROR occurred while retriving department data from database. " + err);
        }else{
            console.table(res);
        }
        mainMenu();
    });
}