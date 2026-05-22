# Student Management REST API

## Overview
A complete REST API for managing student records built with Node.js and Express.js. This project implements full CRUD (Create, Read, Update, Delete) operations for student management.

## Features
- ✅ Node.js and Express.js server running on Port 3000
- ✅ Custom middleware to display request methods in terminal
- ✅ Complete CRUD operations for students
- ✅ In-memory data storage using arrays
- ✅ Error handling and validation
- ✅ JSON request/response format
- ✅ Well-documented API endpoints

## Requirements
- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/sharan12007/ass3.git
cd ass3
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

### 1. GET /students
Fetch all students from the database.

**Request:**
```
GET http://localhost:3000/students
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Students fetched successfully",
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "rollNo": 101
    }
  ],
  "count": 1
}
```

---

### 2. POST /students
Add a new student to the database.

**Request:**
```
POST http://localhost:3000/students
Content-Type: application/json

{
  "name": "Alice Cooper",
  "email": "alice@example.com",
  "rollNo": 104
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Student added successfully",
  "data": {
    "id": 4,
    "name": "Alice Cooper",
    "email": "alice@example.com",
    "rollNo": 104
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Please provide name, email, and rollNo"
}
```

---

### 3. PUT /students/:id
Update an existing student's details.

**Request:**
```
PUT http://localhost:3000/students/1
Content-Type: application/json

{
  "name": "John Doe Updated",
  "email": "johnupdated@example.com",
  "rollNo": 101
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Student updated successfully",
  "data": {
    "id": 1,
    "name": "John Doe Updated",
    "email": "johnupdated@example.com",
    "rollNo": 101
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Student with ID 999 not found"
}
```

---

### 4. DELETE /students/:id
Delete a student from the database.

**Request:**
```
DELETE http://localhost:3000/students/1
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Student deleted successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "rollNo": 101
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Student with ID 999 not found"
}
```

---

## Custom Middleware

The application includes a custom middleware that logs every incoming request method and timestamp to the terminal:

```javascript
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] Request Method: ${req.method}`);
  next();
});
```

**Example Terminal Output:**
```
[3:45:23 PM] Request Method: GET
[3:45:27 PM] Request Method: POST
[3:45:31 PM] Request Method: PUT
[3:45:35 PM] Request Method: DELETE
```

## Default Students

The API comes with 3 pre-loaded students:

| ID | Name | Email | Roll No |
|----|------|-------|---------|
| 1 | John Doe | john@example.com | 101 |
| 2 | Jane Smith | jane@example.com | 102 |
| 3 | Mike Johnson | mike@example.com | 103 |

## Testing with Postman

1. Download and install [Postman](https://www.postman.com/downloads/)
2. Start the server: `npm start`
3. Use the API endpoints listed above
4. Set request method and URL for each endpoint
5. For POST and PUT requests, set Content-Type to `application/json`
6. Include the required JSON body for POST and PUT requests

## Project Structure

```
ass3/
├── server.js          # Main Express server file
├── package.json       # Dependencies and scripts
├── package-lock.json  # Locked dependency versions
├── README.md          # Project documentation
└── node_modules/      # Installed dependencies
```

## Error Handling

The API includes comprehensive error handling:
- ✅ Validation for required fields
- ✅ Duplicate email detection
- ✅ Student ID validation
- ✅ Try-catch error handling
- ✅ Appropriate HTTP status codes

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - New resource created |
| 400 | Bad Request - Invalid input |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error |

## Notes

- Student data is stored in-memory, so it will be reset when the server restarts
- Student IDs are auto-generated based on the highest existing ID
- Email addresses must be unique across all students
- All required fields (name, email, rollNo) must be provided when creating a student

## License

ISC

## Author

Sharan

---

**Developed as part of Assessment 3 - Backend Development**
