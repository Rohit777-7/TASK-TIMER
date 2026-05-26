# TaskFlow – Full Stack Task & Productivity Tracker

## Live Demo

Frontend: https://task-timer-azure.vercel.app/

Backend: https://task-timer-9ljo.onrender.com/

---

# Overview

TaskFlow is a full-stack MERN application that helps users manage daily tasks, track productivity using a real-time timer, and monitor daily progress through a modern dashboard interface.

The application includes secure JWT authentication, protected routes, task CRUD operations, time tracking, and productivity summaries.

---

# Features

## Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- User-specific data security

## Task Management
- Create Tasks
- Update Task Status
- Delete Tasks
- View All Tasks
- Pending / In Progress / Completed status management

## Real-Time Timer Tracking
- Start Timer
- Stop Timer
- Store Time Logs
- Total Time Tracking Per Task

## Daily Summary Dashboard
- Total Tasks
- Completed Tasks
- Pending Tasks
- Total Productivity Time

## UI/UX
- Modern Dark Theme
- Responsive Layout
- Glassmorphism Cards
- Clean Dashboard Design

---

# Tech Stack

## Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Axios
- Vite

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

---

# Folder Structure

```bash
task-tracker-app
│
├── client
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   ├── services
│   │   └── App.jsx
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   └── server.js
```

---

# Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/Rohit777-7/TASK-TIMER
```

---

## 2. Open Project Folder

```bash
cd task-tracker-app
```

---

# Backend Setup

## 1. Go To Server Folder

```bash
cd server
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Create `.env` File

Create a `.env` file inside the `server` folder and add:

```env
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000
```

---

## 4. Start Backend Server

```bash
npm run dev
```

Backend will run on:

```bash
http://localhost:5000
```

---

# Frontend Setup

## 1. Open New Terminal

```bash
cd client
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Start Frontend

```bash
npm run dev
```

Frontend will run on:

```bash
http://localhost:5173
```

---

# Deployment

## Frontend Deployment
Deployed on Vercel

## Backend Deployment
Deployed on Render

---

# Future Improvements

- Weekly Productivity Analytics
- Charts & Graphs
- AI Task Suggestions
- Notifications & Reminders
- Drag & Drop Task Management

---

# Author

Rohit Yadav

---

# Project Status

Completed and Fully Deployed 🚀