# Task Management API

A simple Task Management REST API built with Node.js, Express, and MySQL.
This API allows you to manage users and their assigned tasks.



## Features

- Add users
- Add, update, delete tasks
- Assign tasks to users
- Fetch all tasks



## Project Structure

project-root/
│── db.js         # MySQL connection setup
│── index.js      # Express server and routes
│── package.json  # Dependencies




## Setup Instructions

1. ## Clone the repository## 

   git clone <your-repo-url>
   cd task-management


2. ## Install dependencies## 

   npm install express mysql util

3. ## Setup MySQL Database## 

   CREATE DATABASE task_management;

   USE task_management;

   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(200) NOT NULL,
     email VARCHAR(200) NOT NULL UNIQUE
   );

   CREATE TABLE tasks (
     id INT AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(200) NOT NULL,
     des TEXT,
     status VARCHAR(200),
     deadline DATE,
     user_id INT,
     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
   );

4. ## Configure Database Connection## 
   In `db.js`, update the credentials if needed:

   js
   const conn = mysql.createConnection({
     host: "localhost",
     user: "root",
     password: "",
     database: "task_management",
   });
   

5. ## Run the project## 

    node index.js
   

   Server will run at:
    `http://localhost:3000`


## API Endpoints

### Root

- ## GET /##  → Check if server is running
  ## Response:##  `"Task Management!!"`


### Users

#### Add User

- ## POST /users## 
- ## Body (JSON):## 

  json
  {
    "name": "John Doe",
    "email": "john@example.com"
  }
  

- ## Response:## 

  json
  { "message": "User added successfully!" }
  

### Tasks

#### Create Task

- ## POST /tasks## 
- ## Body (JSON):## 

  json
  {
  "title": "Finish API",
  "des": "Complete task management API",
  "status": "in-progress",
  "deadline": "2025-09-30",
  "user_id": 1
  }

- ## Response:## 

  json
  { "message": "Task added!" }


#### Get All Tasks

## GET /tasks## 
## Response:## 

json
[
{
"id": 1,
"title": "Finish API",
"des": "Complete task management API",
"status": "in-progress",
"deadline": "2025-09-30",
"user_id": 1
}
]

#### Update Task

## PUT /tasks/\:id## 
## Body (JSON):## 

json
{
"title": "Finish API v2",
"des": "Updated description",
"status": "completed",
"deadline": "2025-10-01",
"user_id": 1
}

## Response:## 

json
{ "message": "Task updated!" }


#### Delete Task

## DELETE /tasks/\:id## 
## Response:## 

json
{ "message": "Task Deleted!" }

## Tech Stack

- Node.js
- Express.js
- MySQL
