
# 🏥 HealthCare Service - Spring Boot Backend

This project is a RESTful API built using **Spring Boot**, designed to simulate a basic healthcare service system with user authentication, patient management, and appointment booking functionality.

## 📋 Features

- User Registration and Login with JWT Authentication
- Middleware to secure endpoints (excluding login and registration)
- Patient registration, view, list, and delete operations
- Appointment booking, viewing, and deletion

---

## 🚀 API Endpoints

### 👤 User Endpoints

#### `POST /register`
Registers a new user.
- ✅ Success Response:
  ```json
  { "message": "Registration successful" }
  ```
- ❌ Failure Response:
  ```json
  { "message": "Password or username policy failed" }
  ```

#### `POST /signin`
Logs in a registered user using email and password.
- ✅ Success Response:
  ```json
  {
    "message": "Authentication successful",
    "token": "JWTToken",
    "id": "userId"
  }
  ```
- ❌ Failure Response:
  ```json
  { "message": "Username or Password is incorrect" }
  ```

#### `GET /viewprofile/{userId}`
Returns profile details of the specified user.

#### `GET /editprofile/{userId}`
Returns editable profile details of the specified user.

---

### 🧑‍⚕️ Patient Endpoints

#### `POST /patients/register`
Registers a new patient.
- ✅ Success:
  ```json
  { "message": "Registration successful" }
  ```
- ❌ Failure:
  ```json
  { "message": "Registration failure" }
  ```

#### `GET /patients/list`
Returns a list of all patients.

#### `GET /patients/view/{id}`
Returns patient details by ID.

#### `DELETE /patients/delete/{id}`
Deletes the patient by ID.

---

### 📅 Appointment Endpoints

#### `POST /appointment/register`
Books an appointment.
- ✅ Success:
  ```json
  { "message": "Booking successful" }
  ```
- ❌ Failure:
  ```json
  { "message": "Booking failure" }
  ```

#### `GET /appointment/list`
Returns all appointments.

#### `GET /appointment/view/{appointmentId}`
Returns appointment details by ID.

#### `GET /appointment/list/{patientId}`
Returns appointments of a specified patient.

#### `DELETE /appointment/delete/{appointmentId}`
Deletes an appointment by ID.

---

## 🔐 Middleware

JWT-based authentication middleware protects all endpoints **except**:
- `/register`
- `/signin`

### Flow:
1. User logs in via `/signin`.
2. If credentials are valid, a JWT is returned.
3. All protected endpoints must include this token in headers.

---

## 🛠️ Setup Instructions

### 💻 Software Requirements
- Java Development Kit 8 (JDK 8)

### 📦 Installation

```bash
# Clone the repo
git clone <your-repo-url>
cd <project-folder>

# Clean and build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

### 🧪 Running Tests

```bash
mvn clean test
```

---

## 📚 Tech Stack

- Java 8
- Spring Boot
- Spring Web
- JWT (JSON Web Token)
- Maven

---

## ✅ Notes

- Ensure your machine has Java 8 installed.
- Use Postman or similar tools to test endpoints with appropriate headers and JSON bodies.
- JWT token must be passed in the `Authorization` header for protected endpoints.

---

## 📌 Author

Developed as part of a HackerRank backend development assessment.
