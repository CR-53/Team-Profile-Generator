const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeesArray = [];

function managerDetails() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the Manager's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the Manager's ID?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the Manager's email address?",
            name: "email"
        },
        {
            type: "input",
            message: "What is the Manager's office number?",
            name: "officeNumber"
        }
    ]).then(managerInfo => {
        employeesArray.push(new Manager(managerInfo.name, managerInfo.id, managerInfo.email, managerInfo.officeNumber))
        console.log(employeesArray)
        addEmployee();
    })
}

function addEmployee() {
    inquirer.prompt([
        {
            type: "list",
            message: `Your team currently has ${employeesArray.length} members. Would you like to add another employee?`,
            name: "addEmployee",
            choices: [
                "Yes",
                "No, Generate Team Profile Now"
            ]
        }
    ]).then(answer => {
        if (answer.addEmployee == true) {
            console.log("RUN EMPLOYEE SELECTOR HERE");
        }
        else {
            console.log("GENERATE HTML HERE");
        }
    })
}

function init() {
    console.log(
        `Team Profile Generator v1.0 \n Enter the details for your team one by one, then select 'No, Generate Team Profile Now' to create a HTML file. \n ${"-".repeat(50)}`
    );
    managerDetails();
}

init();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
