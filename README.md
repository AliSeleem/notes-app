# 📝 NestJS Notes App

## 🚀 Overview
This is a **Notes API** built with **NestJS** and **MongoDB (Mongoose)** that allows users to **register, authenticate, and manage their notes**. Each user has their own notes, and the API supports **pagination, search, and authentication** using **JWT**.

---

## ⚙️ Features
✅ **User Authentication** (JWT-based login & registration)  
✅ **CRUD Operations** (Create, Read, Update, Delete notes)  
✅ **Pagination & Search** (Retrieve paginated results & search notes)  
✅ **Swagger Documentation** (API documentation with Swagger UI)  
✅ **Global Error Handling** (Consistent API responses with meaningful errors)  
✅ **Secure Endpoints** (Protected routes for authenticated users)

---

## 🛠 Tech Stack
- **NestJS** (Backend Framework)
- **MongoDB** with **Mongoose** (Database)
- **JWT Authentication** (User auth)
- **Swagger** (API Documentation)
- **@nestjs/config** (Environment Variables)

---

## 📂 Project Structure
```plaintext
📦 notes-app
 ┣ 📂 src
 ┃ ┣ 📂 users
 ┃ ┃ ┣ 📂 dto
 ┃ ┃ ┃ ┣ 📜 create-user.dto.ts
 ┃ ┃ ┣ 📜 jwt-auth.guard.ts
 ┃ ┃ ┣ 📜 jwt.strategy.ts
 ┃ ┃ ┣ 📜 user.controller.ts
 ┃ ┃ ┣ 📜 user.module.ts
 ┃ ┃ ┣ 📜 user.schema.ts
 ┃ ┃ ┣ 📜 user.service.ts
 ┃ ┣ 📂 notes
 ┃ ┃ ┣ 📜 note.module.ts
 ┃ ┃ ┣ 📜 note.service.ts
 ┃ ┃ ┣ 📜 note.controller.ts
 ┃ ┃ ┣ 📜 note.schema.ts
 ┃ ┣ 📜 app.module.ts
 ┃ ┣ 📜 main.ts
 ┣ 📜 .env
 ┣ 📜 package.json
 ┣ 📜 README.md
```

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/AliSeleem/notes-app.git
cd notes-app
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/notesDB
JWT_SECRET=your-secret-key
```

### 4️⃣ Run the Server
```bash
npm run start:dev
```

---

## 🔑 Authentication
### 🛠 Register a New User
```http
POST /users/signup
```
**Body:**
```json
{
  "name": "John",
  "email": "john_doe@mail.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "access_token": "your-jwt-token"
}
```

### 🔓 Login & Get Token
```http
POST /users/login
```
**Body:**
```json
{
  "username": "john_doe",
  "password": "password123"
}
```
**Response:**
```json
{
  "access_token": "your-jwt-token"
}
```

---

## 📜 Notes API Endpoints

### 🔍 Get Notes (With Pagination & Search)
```http
GET /notes?page=1&limit=5&search=meeting
Authorization: Bearer <your-token>
```

### 📝 Create Note
```http
POST /notes
Authorization: Bearer <your-token>
```
**Body:**
```json
{
  "title": "My First Note",
  "content": "This is the content of my note."
}
```

### 🛠 Update Note
```http
PUT /notes/:noteId
Authorization: Bearer <your-token>
```
**Body:**
```json
{
  "title": "Updated Title"
}
```

### ❌ Delete Note
```http
DELETE /notes/:noteId
Authorization: Bearer <your-token>
```

---

## 📘 API Documentation (Swagger)
Run the server and visit:
```
http://localhost:3000/docs
```

---

## 🛠 Postman Setup (Save Token Automatically)
To automatically save the token in **Postman**, add this script to the **Tests** tab in the login request:
```js
pm.environment.set("JWT", pm.response.json().access_token);
```
Then, in **subsequent requests**, use this in the **Authorization** header:
```
Bearer {{authToken}}
```

---

## ⚡️ Future Enhancements
- Add **Redis caching** for improved performance
- Implement **Soft Deletes** instead of direct deletion
- Add **Role-based Access Control (RBAC)**

---

## 📜 License
This project is licensed under the MIT License.

---

## 💡 Contributing
Feel free to fork the repository and submit a pull request! 🚀

