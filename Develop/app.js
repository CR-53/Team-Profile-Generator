const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Array to store the employee data in
const employeesArray = [];

// Inquirer prompts for a manager
function addManager() {
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
        addEmployee();
    })
}

// Inquirer prompts to add another employee or generate the HTML
function addEmployee() {
    console.log(`Your team currently has ${employeesArray.length} members:`);
    console.log(employeesArray);
    inquirer.prompt([
        {
            type: "list",
            message: `Would you like to add another employee?`,
            choices: [
                "Yes",
                "No, Generate Team Profile Now"
            ],
            name: "addEmployee"
        }
    ]).then(answer => {
        if (answer.addEmployee == "Yes") {
            employeeSelector();
        }
        else {
            generateHTML();
            console.log(`Your team profile has now been created in './output/team.htm'`)
        }
    })
}

// Inquirer prompts to select the type of employee to add
function employeeSelector() {
    inquirer.prompt([
        {
            type: "list",
            message: "What is the employee's role?",
            choices: [
                "Engineer",
                "Intern"
            ],
            name: "role",
        }
    ]).then(newEmployee => {
        if (newEmployee.role == "Engineer") {
            addEngineer();
        }
        else if (newEmployee.role == "Intern"){
            addIntern();
        }
        else {
            console.log("ERROR! Please exit the application and try again.")
        }
    })    
}

// Inquirer prompts for an engingeer
function addEngineer() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the Engineer's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the Engineer's ID?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the Engineer's email address?",
            name: "email"
        },
        {
            type: "input",
            message: "What is the Engineer's GitHub username?",
            name: "github"
        }
    ]).then(engineerInfo => {
        employeesArray.push(new Engineer(engineerInfo.name, engineerInfo.id, engineerInfo.email, engineerInfo.github))
        addEmployee();
    })
}

// Inquirer prompts for an intern
function addIntern() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the Intern's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the Intern's ID?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the Intern's email address?",
            name: "email"
        },
        {
            type: "input",
            message: "Which school is the Intern from?",
            name: "school"
        }
    ]).then(internInfo => {
        employeesArray.push(new Intern(internInfo.name, internInfo.id, internInfo.email, internInfo.school))

        addEmployee();
    })
}

// Generates HTML and creates output path if one does not already exist
function generateHTML() {
    console.log(`Generating HTML...`);
    const teamData = render(employeesArray);
    if (fs.existsSync(outputPath) === true) {
        console.log(`Output path located...`)
    }
    else {
        console.log(`Generating output path...`);
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, teamData);
}

// Function to start the app
function init() {
    console.log(
        `Team Profile Generator v1.0 \n Enter the details for your team one by one, then select 'No, Generate Team Profile Now' to create a HTML file. \n ${"-".repeat(50)}`
    );
    addManager();
}

init();


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

