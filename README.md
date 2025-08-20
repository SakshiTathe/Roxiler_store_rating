# Store Rating Platform

A full-stack web application that allows users to **rate stores** (1–5 stars), with role-based access for **Admin, Store Owners, and Normal Users**.

## Tech Stack

* **Frontend**: React.js
* **Backend**: Express.js 
* **Database**: MySQL

## Features

### Authentication

* Single login system for all roles
* JWT-based authentication

###  User Roles

**1. System Administrator**

* Add new stores, users, and admin users
* View dashboard with total users, stores, and ratings
* Manage listings of users and stores with filters & sorting

**2. Normal User**

* Sign up, log in, log out
* View all registered stores
* Search stores by name/address
* Submit & update ratings for stores

**3. Store Owner**

* Log in & update password
* View users who rated their store
* See average rating of their store

### ✅ Form Validations

* **Name**: 20–60 characters
* **Address**: Max 400 characters
* **Password**: 8–16 characters, at least one uppercase & one special character
* **Email**: Must be valid

---

## 🛠️ Installation

### Clone the repository

```bash
https://github.com/SakshiTathe/Roxiler_store_rating.git
cd path of project root folder
```
### Start database connection first. create .env file in backend to store credentials 

### Backend Setup

```bash
cd backend
npm install
```

### Frontend Setup

```bash
cd frontend
npm install
```
### To Create automatically tables in database using code Run given code in backend server.js by changing table nmme from models folder
```bash
const UsersTab = require("./models/ratingModel");
(async () => {
    await UsersTab();
})();  
```
### Root folder
```bash
npm start //this will start both frontend and backend concurrently 
```

---




