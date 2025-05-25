# User Access Management System

A secure and role-based User Access Management System built with **Node.js**, **Express**, **TypeORM**, **PostgreSQL**, and **JWT** for authentication and authorization.

---

## 🔧 Features

- ✅ User registration and login
- 🔐 Password hashing using `bcrypt`
- 🛡️ JWT-based authentication
- 👥 Role-based access control (Admin, Manager, Employee)
- 📦 PostgreSQL database with TypeORM
- 📘 Clean folder structure with modular code

---

## 📁 Project Structure
server/
├── src/
│ ├── config/ # Database config
│ ├── controllers/ # Authentication logic
│ ├── middleware/ # Auth middlewares
│ ├── models/ # Entity schemas
│ ├── router/ # Route definitions
│ └── utils/ # Utility functions
├── .env
└── index.js # Server entry point

Configure Environment Variables

PORT=8080
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=your_db_user
DATABASE_PASSWORD=your_db_password
DATABASE_NAME=your_db_name
JWT_SECRET=your_jwt_secret

4. Setup PostgreSQL Database
CREATE DATABASE your_db_name;

API Endpoints
Auth Routes
Method	Endpoint	Description
POST	/api/auth/signup	Register a new user
POST	/api/auth/login	Login and get JWT token
GET	/api/auth/me	Get current user info (requires token)

📌 Technologies Used
Node.js

Express.js

PostgreSQL

TypeORM

bcrypt

JSON Web Tokens (JWT)

user signup 
![WhatsApp Image 2025-05-25 at 21 04 10_ffa6460a](https://github.com/user-attachments/assets/8e0ce5de-3269-4948-a12d-e4c6e3c8660a)

user dashboard

![WhatsApp Image 2025-05-25 at 21 08 01_82a7e203](https://github.com/user-attachments/assets/23b39a95-c866-4998-af4e-213bbafa92c4)

user request 
![WhatsApp Image 2025-05-25 at 21 10 46_a7753c57](https://github.com/user-attachments/assets/f3fd5190-52e4-4352-8bbb-7235b06d2f31)



