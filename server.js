const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Array to store student data (in-memory database)
let students = [
  { id: 1, name: 'John Doe', email: 'john@example.com', rollNo: 101 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', rollNo: 102 },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', rollNo: 103 }
];

// Custom middleware to display request method in terminal
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] Request Method: ${req.method}`);
  next();
});

// GET /students - Fetch all students
app.get('/students', (req, res) => {
  console.log('Fetching all students...');
  res.status(200).json({
    success: true,
    message: 'Students fetched successfully',
    data: students,
    count: students.length
  });
});

// POST /students - Add a new student
app.post('/students', (req, res) => {
  try {
    const { name, email, rollNo } = req.body;

    // Validation
    if (!name || !email || !rollNo) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and rollNo'
      });
    }

    // Check if student with same email already exists
    const existingStudent = students.find(s => s.email === email);
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'Student with this email already exists'
      });
    }

    // Create new student object
    const newStudent = {
      id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1,
      name,
      email,
      rollNo
    };

    students.push(newStudent);
    console.log('New student added:', newStudent);

    res.status(201).json({
      success: true,
      message: 'Student added successfully',
      data: newStudent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding student',
      error: error.message
    });
  }
});

// PUT /students/:id - Update student details
app.put('/students/:id', (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    const { name, email, rollNo } = req.body;

    // Find student by ID
    const student = students.find(s => s.id === studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${studentId} not found`
      });
    }

    // Check if email is already taken by another student
    if (email && email !== student.email) {
      const emailExists = students.find(s => s.email === email);
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: 'Email already exists for another student'
        });
      }
    }

    // Update student details
    if (name) student.name = name;
    if (email) student.email = email;
    if (rollNo) student.rollNo = rollNo;

    console.log('Student updated:', student);

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating student',
      error: error.message
    });
  }
});

// DELETE /students/:id - Delete a student
app.delete('/students/:id', (req, res) => {
  try {
    const studentId = parseInt(req.params.id);

    // Find student index
    const studentIndex = students.findIndex(s => s.id === studentId);
    if (studentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${studentId} not found`
      });
    }

    // Remove student
    const deletedStudent = students.splice(studentIndex, 1);
    console.log('Student deleted:', deletedStudent[0]);

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: deletedStudent[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting student',
      error: error.message
    });
  }
});

// Start server only when running directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`===========================================`);
    console.log(`Student Management API Server Running`);
    console.log(`Server is listening on http://localhost:${PORT}`);
    console.log(`===========================================`);
    console.log(`Available Endpoints:`);
    console.log(`GET    /students       - Fetch all students`);
    console.log(`POST   /students       - Add a new student`);
    console.log(`PUT    /students/:id   - Update student details`);
    console.log(`DELETE /students/:id   - Delete a student`);
    console.log(`===========================================`);
  });
}

module.exports = app;
