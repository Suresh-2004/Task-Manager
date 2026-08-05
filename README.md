# Task Manager Application

## Project Overview

Task Manager is a simple Java Full Stack web application developed to manage daily tasks.

In this application, users can register, login using JWT Authentication, create tasks, update tasks, delete tasks, search tasks, filter tasks, sort tasks, and mark tasks as completed.

This project was developed to learn Java Full Stack development using Spring Boot, React, MySQL, and JWT Authentication.

## Features

* User Registration
* User Login
* JWT Authentication
* Dashboard
* Dashboard Summary
* Create Task
* View All Tasks
* Update Task
* Delete Task
* Complete Task
* Search Task
* Filter by Status
* Filter by Priority
* Sort by Due Date
* Responsive User Interface

## Technologies Used

### Frontend

* React
* JavaScript
* HTML
* CSS
* Axios

### Backend

* Spring Boot
* Spring Security
* JWT Authentication
* Spring Data JPA
* Hibernate

### Database

* MySQL

### Build Tool

* Maven

### API Testing

* Swagger UI
* Postman

### IDE

* IntelliJ IDEA
* Visual Studio Code

## Project Structure

Task_Manager
│
├── backend
│   ├── Controller
│   ├── Service
│   ├── Repository
│   ├── Entity
│   ├── Security
│   ├── Config
│   └── Resources
│
└── frontend
├── components
├── api.js
├── App.js
├── app.css
└── index.js

## Application Flow

React Frontend
↓
Axios
↓
Spring Boot Controller
↓
Service
↓
Repository
↓
MySQL Database
↓
Response
↓
React UI

## Modules

### Authentication Module

* Register User
* Login User
* JWT Token Generation
* JWT Authentication

### Task Module

* Create Task
* View Tasks
* Update Task
* Delete Task
* Complete Task
* Search Task
* Filter Tasks
* Sort Tasks

### Dashboard Module

* Total Tasks
* Pending Tasks
* Completed Tasks
* Overdue Tasks

## REST APIs

### Authentication APIs

**POST** `/api/auth/register` - Register User


**POST** `/api/auth/login` - Login User



### Task APIs

**GET** `/api/tasks` - Get All Tasks


**POST** `/api/tasks` - Create Task


**GET** `/api/tasks/{id}` - Get Task By Id


**PUT** `/api/tasks/{id}` - Update Task


**DELETE** `/api/tasks/{id}` - Delete Task


**PUT** `/api/tasks/{id}/complete` - Complete Task



### Search and Filter APIs

**GET** `/api/tasks/search`


**GET** `/api/tasks/status`


**GET** `/api/tasks/priority`


**GET** `/api/tasks/sort`


**GET** `/api/tasks/dashboard`



## Database

### User Table

* id
* username
* email
* password

### Task Table

* id
* title
* description
* priority
* status
* dueDate
* createdDate

## How to Run the Project

### Backend

1. Open backend project in IntelliJ IDEA.
2. Create MySQL database named: task_manager_db
3. Update database username and password inside: application.properties
4. Run: BackendApplication.java

Backend runs on: http://localhost:8080

### Frontend

1. Open your terminal.
2. Go to frontend folder: `cd frontend`
3. Install packages: `npm install`
4. Run React project: `npm start`

Frontend runs on: http://localhost:3000

## Swagger

Swagger URL: http://localhost:8080/swagger-ui/index.html

## Future Improvements

* Email Notification
* File Upload
* Dark Mode
* User Profile
* Admin Dashboard
* Task Categories
* Calendar View
* Mobile Responsive Design

## Learning Outcome

This project helped me understand:

* Java Full Stack Development
* React Basics
* Spring Boot
* Spring Security
* JWT Authentication
* REST APIs
* CRUD Operations
* MySQL
* JPA and Hibernate
* MVC Architecture
* API Integration
* Frontend and Backend Communication

## Author

**Suresh Kumar**
Java Full Stack Developer