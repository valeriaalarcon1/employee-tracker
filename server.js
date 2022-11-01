// DEPENDENCIES
const express = require('express');
// import and require MySQL2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '',
    database: 'employees_db'
  },
  console.log(`Connected to the courses_db database.`)
);


// FUNCTIONS

function prompt() {
    inquirer
        .prompt({
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add a Department",
                "Add a Role",
                "Add an Employee",
                "Update an Employee Role"
            ]
        })
        .then(function ({action}) {
            switch (action) {
                case "View All Departments":
                    viewDepartments();
                    break;

                case "View All Roles":
                    viewRoles();
                    break;
                
                case "View All Employees":
                    viewEmployees();
                    break;

                case "Add a Department":
                    addDepartment();
                    break;
                
                case "Add a Role":
                    addRole();
                    break;

                case "Add an Employee":
                    addEmployee();
                    break;
                
                case "Update an Employee Role":
                    updateRole();
                    break;
            }
        })
};






// Query database

function viewDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        console.log(results);
        });
};




function viewRoles() {
    db.query('SELECT * FROM role', function (err, results) {
        console.log(results);
        });
};




function viewEmployees() {
    db.query('SELECT * FROM employee', function (err, results) {
        console.log(results);
        });
};




function addDepartment() {

};




function addRole() {

};





function addEmployee() {

};





function updateRole() {

};





// Default response for any other request (Not Found)
app.use((req, res) => {
res.status(404).end();
});

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
