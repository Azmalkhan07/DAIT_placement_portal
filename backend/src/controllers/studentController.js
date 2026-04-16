const Student = require("../models/Student");

const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ success: false, message: "Failed to fetch students" });
  }
};

const addStudent = async (req, res) => {
  try {
    const { name, email, department, year, status } = req.body;

    // Input validation
    if (!name || !email || !department || !year || !status) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid name provided",
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    const student = await Student.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      department: department.trim(),
      year: year.trim(),
      status,
    });

    res.json({
      success: true,
      message: "Student added successfully",
      student,
    });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ success: false, message: "Failed to add student" });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID",
      });
    }

    // Whitelist allowed fields to prevent mass assignment
    const allowedFields = ['name', 'email', 'department', 'year', 'status'];
    const updateData = {};
    
    allowedFields.forEach(field => {
      if (req.body.hasOwnProperty(field)) {
        updateData[field] = req.body[field];
      }
    });

    const student = await Student.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.json({
      success: true,
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ success: false, message: "Failed to update student" });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID",
      });
    }

    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ success: false, message: "Failed to delete student" });
  }
};

module.exports = {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
};