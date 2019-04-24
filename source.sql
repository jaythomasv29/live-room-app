DROP database classes_db IF EXISTS;
create database classes_db;
use classes_db;

create table courses (
    id INT auto_increment,
    course_name VARCHAR(255),
    teacher VARCHAR(255),
    school VARCHAR(255),
    description VARCHAR(255),
    createdAt DATE,
    updatedAt DATE,
    PRIMARY KEY(id)
);

create table posts(
    post_id INT auto_increment NOT NULL,
    course_id INT NOT NULL,
    post_owner VARCHAR(255),
    post_title VARCHAR(255),
    post_body VARCHAR(255),
    FOREIGN KEY(course_id) REFERENCES courses(id),
    PRIMARY KEY(post_id)
);