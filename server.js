// DEPENDENCIES
const inquirer = require("inquirer");
// import and require MySQL2
const mysql = require('mysql2');

// connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'AbraLucy567!',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
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
    db.query(`SELECT * FROM department`, function (err, results) {
        console.log(results);
        });
        
    prompt();
};




function viewRoles() {
    db.query(`SELECT role.title as 'Job Title', role.id as 'Role ID', department.name as 'Department', department.id as 'Department ID'
            FROM role
            JOIN department
            ON role.department_id = department.id`, function (err, results) {
        console.log(results);
        });

    prompt();
};




function viewEmployees() {
    db.query(`SELECT employee.id as 'Employee ID', employee.first_name as 'First Name', employee.last_name as 'Last Name', role.title as 'Job Title', department.name as 'Department', role.salary as 'Salary', employee.manager_id as 'Manager'
            FROM employee
            LEFT JOIN role
            ON employee.role_id = role.id
            LEFT JOIN department
            ON role.department_id = department.id
            LEFT JOIN employee
            ON employee.manager_id = employee.id`, function (err, results) {
        console.log(results);
        });
    
    prompt();
};




function addDepartment() {
    inquirer
        .prompt({
                type: "input",
                name: "departmentName",
                message: "What would you like to call the new Department?"
            })
        .then(function (answer) {
            db.query(`INSERT INTO department SET ?`,
            {
                name: answer.name
            },
            function (err, results) {
                console.log(results);
                });
        });
};




function addRole() {
    inquirer
    .prompt([
        {
            type: "input",
            name: "roleTitle",
            message: "What is the title of the role?"
        },
        {
            type: "input",
            name: "roleSalary",
            message: "What is the salary of the role?"
        },
        {
            type: "list",
            name: "roleDepartment",
            message: "Which department does the role belong to?",
            choices: ["Sales", "Engineering", "Finance", "Legal"]
        }

    ])
    .then(function (answer) {
        if (answer.roleDepartment = "Sales") {
            const dep_id = 1;
        } else if (answer.roleDepartment = "Engineering") {
            const dep_id = 2;
        } else if (answer.roleDepartment = "Finance") {
            const dep_id = 3;
        } else if (answer.roleDepartment = "Legal") {
            const dep_id = 4;
        };
        db.query(`INSERT INTO role SET ?`,
        {
            title: answer.roleTitle,
            salary: answer.roleSalary,
            department_id: dep_id
        },
        function (err, results) {
            console.log(results);
            });
    });
};





function addEmployee() {
    inquirer
    .prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?"
        },
        {
            type: "list",
            name: "role",
            message: "What is the employee's role?",
            choices: [
                "Sales Lead",
                "Salesperson",
                "Lead Engineer",
                "Software Engineer",
                "Account Manager",
                "Accountant",
                "Legal Team Lead",
                "Lawyer"
            ]
        },
        {
            type: "list",
            name: "manager",
            message: "Who is the employee's manager?",
            choices: [
                "N/A",
                "John Fisher",
                "Ashley Rodriguez",
                "Kunal Singh",
                "Sarah Lourd"
            ]
        }

    ])
    .then(function (answer) {
        if (answer.role = "Sales Lead") {
            const role_id = 1;
        } else if (answer.role = "Salesperson") {
            const role_id = 2;
        } else if (answer.role = "Lead Engineer") {
            const role_id = 3;
        } else if (answer.role = "Software Engineer") {
            const role_id = 4;
        } else if (answer.role = "Account Manager") {
            const role_id = 5;
        } else if (answer.role = "Accountant") {
            const role_id = 6;
        } else if (answer.role = "Legal Team Lead") {
            const role_id = 7;
        } else if (answer.role = "Lawyer") {
            const role_id = 8;
        }

        if (answer.manager = "N/A") {
            const manager_id = null;
        } else if (answer.manager = "John Fisher") {
            const manager_id = 1;
        } else if (answer.manager = "Ashley Rodriguez") {
            const manager_id = 3;
        } else if (answer.manager = "Kunal Singh") {
            const manager_id = 5;
        } else if (answer.manager = "Sarah Lourd") {
            const manager_id = 7;
        };

        db.query(`INSERT INTO employee SET ?`,
        {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.role_id,
            manager_id: answer.manager_id
        },
        function (err, results) {
            console.log(results);
            });
    });
};





function updateRole() {
    inquirer
    .prompt([
        {
            type: "list",
            name: "employee",
            message: "Which employee's role would you like to update?",
            choices: [
                "John Fisher",
                "Mike Chan",
                "Ashley Rodrigez",
                "Kevin Tupik",
                "Kunal Singh",
                "Malia Brown",
                "Sarah Lourd",
                "Tom Allen"
            ]
        },
        {
            type: "list",
            name: "role",
            message: "Which role would you like to assign to the selected employee?",
            choices: [
                "Sales Lead",
                "Salesperson",
                "Lead Engineer",
                "Software Engineer",
                "Account Manager",
                "Accountant",
                "Legal Team Lead",
                "Lawyer"
            ]
        }
    ])
    .then(function (answer) {

        if (answer.employee = "John Fisher") {
            const id = 1;
        } else if (answer.employee = "Mike Chan") {
            const id = 2;
        } else if (answer.employee = "Ashley Rodriguez") {
            const id = 3;
        } else if (answer.employee = "Kevin Tupik") {
            const id = 4;
        }  else if (answer.employee = "Kunal Singh") {
            const id = 5;
        }  else if (answer.employee = "Malia Brown") {
            const id = 6;
        }  else if (answer.employee = "Sarah Lourd") {
            const id = 7;
        }  else if (answer.employee = "Tom Allen") {
            const id = 8;
        };

        if (answer.role = "Sales Lead") {
            const role_id = 1;
        } else if (answer.role = "Salesperson") {
            const role_id = 2;
        } else if (answer.role = "Lead Engineer") {
            const role_id = 3;
        } else if (answer.role = "Software Engineer") {
            const role_id = 4;
        } else if (answer.role = "Account Manager") {
            const role_id = 5;
        } else if (answer.role = "Accountant") {
            const role_id = 6;
        } else if (answer.role = "Legal Team Lead") {
            const role_id = 7;
        } else if (answer.role = "Lawyer") {
            const role_id = 8;
        };


        db.query(`UPDATE employee SET role_id = ${role_id} WHERE id = ${id}`,
        function (err, results) {
            console.log(results);
            });
    });
};