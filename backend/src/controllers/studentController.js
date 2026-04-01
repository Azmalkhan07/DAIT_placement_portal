const Student = require("../models/Student");

const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch students" });
  }
};

const addStudent = async (req, res) => {
  try {
    const { name, email, department, year, status } = req.body;

    const student = await Student.create({
      name,
      email,
      department,
      year,
      status,
    });

    res.json({
      success: true,
      message: "Student added successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add student" });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findByIdAndUpdate(id, req.body, {
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
    res.status(500).json({ success: false, message: "Failed to update student" });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

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
    res.status(500).json({ success: false, message: "Failed to delete student" });
  }
};

module.exports = {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
};