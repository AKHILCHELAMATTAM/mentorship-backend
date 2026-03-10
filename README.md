Mentora Backend API

A simplified backend for a mentorship platform where Parents, Students, and Mentors interact.
This project simulates core backend functionality of the Mentora platform.

Built with Node.js, Express.js, MongoDB, and Mongoose.

Features
Authentication

Parent and Mentor signup

User login

JWT authentication

Password hashing

Endpoints:

POST /auth/signup
POST /auth/login
GET /auth/me
Student Management (Parent only)

Parents can create and manage students under their account.

Endpoints:

POST /students
GET /students
Lesson Management (Mentor)

Mentors can create lessons.

Endpoint:

POST /lessons

Fields:

title
description
mentorId
Booking System

Parents can assign a student to a lesson.

Endpoint:

POST /bookings

Fields:

studentId
lessonId
Session System

Each lesson can contain multiple sessions.

Endpoints:

POST /sessions
GET /lessons/:id/sessions

Fields:

lessonId
date
topic
summary
LLM Text Summarization

Summarizes large text using an LLM API.

Endpoint:

POST /llm/summarize

Example request:

{
"text": "Artificial Intelligence is transforming industries..."
}

Example response:

{
"summary": "AI is transforming multiple industries by improving automation and decision-making.",
"model": "gpt"
}

Validation rules:

Text must be provided

Minimum 50 characters

Maximum 10,000 characters

Basic rate limiting applied

Tech Stack

Backend:

Node.js

Express.js

Database:

MongoDB

Mongoose

Security:

JWT Authentication

Password hashing with bcrypt

LLM Integration:

OpenAI / Gemini API

Project Structure
mentora-backend
│
├── config
│   └── db.js
│
├── models
│   ├── User.js
│   ├── Student.js
│   ├── Lesson.js
│   ├── Booking.js
│   └── Session.js
│
├── routes
│   ├── authRoutes.js
│   ├── studentRoutes.js
│   ├── lessonRoutes.js
│   ├── bookingRoutes.js
│   ├── sessionRoutes.js
│   └── llmRoutes.js
│
├── middleware
│   └── authMiddleware.js
│
├── .env
├── server.js
├── package.json
└── README.md
Environment Variables

Create a .env file in the root folder.

Example:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mentora
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_key
How to Run the Project
1 Install Dependencies

Open terminal in project folder:

npm install
2 Start MongoDB

Run MongoDB server:

"C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe"

MongoDB will start on:

mongodb://127.0.0.1:27017
3 Start Backend Server

In another terminal:

node server.js

You should see:

MongoDB Connected
Server running on port 5000
API Base URL
http://localhost:5000
Testing APIs

APIs can be tested using:

Postman

curl

Thunder Client (VS Code)

Example:

Signup request:

POST http://localhost:5000/auth/signup

Body:

{
"name":"Akhil",
"email":"akhil@test.com",
"password":"123456",
"role":"parent"
}
Security Practices

Passwords hashed using bcrypt

JWT authentication

Environment variables for secrets

Input validation

Basic rate limiting for LLM endpoint

Bonus Features

Role-based permissions

Session management

LLM integration

Clean project structure

Author

Akhil Raj
Backend Developer
