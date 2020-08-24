CREATE TABLE roles(
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(40) NOT NULL,
salary DECIMAL(9, 2) NOT NULL,
department_id INT NOT NULL,
FOREIGN KEY(department_id) REFERENCES departments(id)
);