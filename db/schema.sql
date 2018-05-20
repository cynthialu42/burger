CREATE DATABASE burgers_db;
USE burgers_db;

CREATE TABLE burgers (
    id NOT NULL AUTO_INCREMENT,
    burger_name VARCHAR(255),
    devoured BOOLEAN DEFAULT FALSE,
    PRIMARY KEY(id)
);