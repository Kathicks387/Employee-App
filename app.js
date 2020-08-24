const express = require('express');
const fs = require('fs');
const inquirer = require('inquirer');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cTable = require('console.table');
const { exit } = require('process');



var app = express();

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'N3wcar33r4m3!',
    database: 'employbank'
});

connection.connect(function(err) {
    if (err) throw err;
    promptUser();
  });
  
function promptUser() {
   inquirer.prompt({
      type: 'rawlist',
      message: 'What would you like to do?',
      name: 'action',
      choices: [ 
        
        'View Departments',  
        'Add Departments',
        'View Roles',
        'Add Roles',
        'View Employees',
        'Add Employees',
        "Update Employee's Roles",
        "Update Employee's Manager",
        'View Employees By Manager',
        'Exit',
    ],
    })
    .then(function(answer){
       switch(answer.action) 
       {
        case 'View Departments':
          viewDepartments();
            break;

        case 'Add Departments':
            addDepartments();
            break; 

        case 'View Roles':
          viewRoles();
          break;  
                   
        case 'Add Roles':
          addRoles();
          break;    

        case 'View Employees':
          viewEmployees();
          break;  
    
        case 'Add Employees':
         addEmployees();
         break;  
                   
        case 'Update Employees Roles':
          employeeRoleUp();  
            break; 
            
        case "Update Employee's Manager":     
          employeeManUp();
            break;

        case 'View Employees By Manager':
          managerView();
            break;

        case 'Exit':
          exit();
            break;
                           
                                                     
        }
    })
};
function viewDepartments() {
    connection.query("Select * from departments", function(err, res) {
      if (err) throw err;
        console.table(res);
            promptUser();
      }
     )
  };

  function addDepartments() {
    return inquirer.prompt({
       type: 'input',
       message: 'What is the name of the department you would like to add?',
       name: 'deptAdd'
      }
    )
 
 
    .then(function(answer){
      connection.query(
        'INSERT INTO departments SET ?',
        {
          name: answer.deptAdd
        },
        function(err) {
          if (err) throw err;
          console.table("Your department has been successfully added.");
          promptUser();
        });
    });
  }
  


  function viewRoles() {
    connection.query("SELECT * FROM roles", function(err, res) {
      if (err) throw err;
          console.table(res);
          promptUser();
        }
    )
    };

  function addRoles() {
    return inquirer.prompt([
      {
        type: 'input',
        message: 'What is the id number of the new role?',
        name: 'idAdd'
    },
    {
        type: 'input',
        message: 'What is the title of the role?',
        name: 'titleAdd'
    },
    {
      type: 'input',
      message: "What is the salary of the new role?",
      name: 'salaryAdd'
  },
  {
    type: 'input',
      message: 'What is the department id of the new role?',
      name: 'depIdAdd'
    } ]
     )

    .then(function(answer){
      connection.query(
        "INSERT INTO roles SET ?",
        {
          id:      answer.idAdd,
          title: answer.titleAdd,
          salary: answer.salaryAdd,
          department_id: answer.depIdAdd
        },
      
        function(err) {
          if (err) throw err;
          console.log("The role has been successfully added.")
          promptUser();
        }
      );

    });
  }

  function viewEmployees() {
    connection.query("SELECT employees.id, first_name, last_name, role_id, manager_id, title, salary,name FROM roles JOIN employees ON roles.id = employees.role_id INNER JOIN departments ON department_id = departments.id", function(err, res) {
      if (err) throw err;
      {
        console.table(res);
      }
      promptUser();
    });
  }

  function addEmployees() {
    return inquirer.prompt([
      {
       type:    'input',
       message: 'What is the first name of the employee you would like to add?',
       name:    'fNameAdd'
    },
    {
      type:     'input',
      message:  'What is the last name of the employee you want to add?',
      name:     'lNameAdd'
    },
    { 
      type:    'rawlist',
      message: "What is the employee's role id?",
      name:    'roleAdd',
      choices:  
      [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
      ],
    },
    {
      type:    'rawlist',
      name:    'manAdd',
      message: "What is the id number of this person's manager?",
      choices:
      [
        '1',
        '2',
        '3',
        '4',
        '5',
      ],      
    }]
     )

    .then(function(answer){
      connection.query("INSERT INTO employees SET ?",
        {
          first_name: answer.fNameAdd,
          last_name:  answer.lNameAdd,
          role_id :       answer.roleAdd,
          manager_id: answer.manAdd
        },
        function(err) {
          if (err) throw err;
          console.log("The new employee has been successfully added.");
        
          promptUser();
    } 
     );
    }
    );
  }
        
    
  function employeeRoleUp() {
    return inquirer.prompt([
      {
        type: 'input',
        message: "What is the employee's id number?",
        name: 'employIdNum',
        
      },
      {
        type: 'input',
        message: "What is the employee's new role id?",
        name: 'newRole',
      }
    ]
    )
    .then(function(answer){
      connection.query(
      'UPDATE employees SET ? WHERE ?',
    [ {role_id: answer.newRole}, {id: answer.employIdNum} ]
    ,
      function (err) {
        if (err)
          throw err;
        console.log('Employee role has been updated')
        promptUser();
      }
    );
  })
  }
 
  function employeeManUp() {
    return inquirer.prompt([
      {
        type: 'input',
        message: "What is the employee's id number?",
        name: 'employIdNumb',
        
      },
      {
        type: 'input',
        message: "What is the id number of the new manager you are assigning this employee to?",
        name: 'newMan',
      }
    ]
    )
    .then(function(answer){
      connection.query(
      'UPDATE employees SET ? WHERE ?',
    [ {manager_id: answer.newMan}, {id: answer.employIdNumb} ]
    ,
      function (err) {
        if (err)
          throw err;
        console.log('The manager has been updated for this employee')
        promptUser();
      }
    );
  })
  }
 