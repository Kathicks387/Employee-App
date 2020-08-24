USE employbank;
CREATE TABLE employees(
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
    role_id INT NOT NULL,
	FOREIGN KEY(role_id) REFERENCES roles(id),
    manager_id INT NULL,
    FOREIGN KEY(manager_id) REFERENCES roles(id)
);