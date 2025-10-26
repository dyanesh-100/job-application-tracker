# 🧾 Job Application Tracker (MERN Stack)

A simple and functional **Job Application Tracker** built using the **MERN Stack** — MongoDB, Express, React, and Node.js.  
This application helps **job seekers** manage and track all their job applications in one place.

---

## 🚀 Objective

The goal of this project is to allow users to **create, view, edit, and delete** job applications efficiently while maintaining a clean and user-friendly interface.  
It also includes **authentication**, **responsive dashboard**, **CRUD modals**.

---

## 🧠 Features

- **Add Job Application:** Create a new record with company name, job title, application date, status, location, and application link.
- **View All Applications:** List all applications.
- **View Single Application:** See detailed information of a specific job in a modal.
- **Edit Application:** Update any job record with validation.
- **Delete Application:** Remove a job record with a confirmation prompt.
- **Authentication:** Signup, login, logout.
- **Search Functionality:** Search jobs by company, job title, or job ID.
- **Filter Applications:** Filter jobs based on their status (e.g., Applied, Interview, Offer, Rejected).

---

## 🧩 Tech Stack

**Frontend:** React.js, Tailwind CSS  
**Backend:** Node.js, Express.js, MongoDB + Mongoose, JWT authentication  

---

## ⚙️ Setup / Run Locally

### 1. Clone the repository
```bash
git clone [https://github.com/](https://github.com/)<your-username>/job-application-tracker.git
cd job-application-tracker
````

### 2\. Backend setup

```bash
cd backend
npm install
```

  * Create a `.env` file in the `backend` folder:

<!-- end list -->

```
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
JWT_EXPIRES_IN=1d
```

  * Start backend server:

<!-- end list -->

```bash
npm start
```

### 3\. Frontend setup

```bash
cd frontend
npm install
```

  * Update the base URL directly in `frontend/src/services/api` (e.g., in your API utility file) to point to your backend.
    Example:

<!-- end list -->

```javascript
// in frontend/src/services/api.js or similar
const API_BASE_URL = 'http://localhost:5000/api';
```

  * Start frontend:

<!-- end list -->

```bash
npm start
```
-----

## 🌐 Deployed Links

* **Frontend (React App):** [**View Live App**](https://job-application-tracker-fe.vercel.app/)
* **Backend (API):** [**View Live API**](https://job-application-tracker-be.vercel.app/)

-----

## 🔗 API Endpoints Overview

| Method | Endpoint                  | Description                          |
| ------ | ------------------------- | ------------------------------------ |
| POST   | `/api/auth/signup`        | Register a new user                  |
| POST   | `/api/auth/login`          | Login a user and return JWT          |
| GET    | `/api/auth/logout`        | Logout user (clear token)            |
| POST   | `/api/jobs`               | Create a new job application (validates inputs before saving) |
| GET    | `/api/jobs`               | Fetch all job applications for the logged-in user (sorted by creation date) |
| GET    | `/api/jobs/:id`           | Get details of a specific job application by its MongoDB ID |
| PUT    | `/api/jobs/:id`           | Update an existing job (validates updated data) |
| DELETE | `/api/jobs/:id`           | Delete a specific job application     |
| GET    | `/api/jobs/status/:status`| Get all jobs filtered by status (e.g., Applied, Interview) |
| GET    | `/api/jobs/search?query=` | Search jobs by company, role, or ID  |

> All protected routes require JWT token in headers.

-----

## 🎥 Demo Videos

  * **Desktop View:** [https://drive.google.com/file/d/1cK_iaFvXe7hBKSKMwyunDY6Bc2PXSXT3/view?usp=drive_link]
  * **Mobile View:** [https://drive.google.com/file/d/1a0U3dubX5vOhFY8xud6uihqFfDgqlfv0/view?usp=drive_link]

-----

## 📂 Folder Structure

```
job-application-tracker/
│
├── backend/           # Node.js + Express + MongoDB
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   ├── app.js
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   └── vercel.json
│
├── frontend/          # React.js + Tailwind CSS
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── package-lock.json
│
└── README.md

```

```
```