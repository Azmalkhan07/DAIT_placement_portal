const { Parser } = require("json2csv");
const Student = require("../models/Student");
const TestReport = require("../models/TestReport");

const exportStudents = async (req, res) => {
  try {
    const students = await Student.find();

    if (!students || students.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: "No students found to export" 
      });
    }

    const fields = ["name", "email", "department", "year", "status"];
    const parser = new Parser({ fields });

    const csv = parser.parse(students);

    res.header("Content-Type", "text/csv");
    res.attachment("students.csv");
    res.send(csv);
  } catch (error) {
    console.error("Error exporting students:", error);
    res.status(500).json({ 
      success: false,
      message: "CSV export failed" 
    });
  }
};

const exportReports = async (req, res) => {
  try {
    const reports = await TestReport.find();

    if (!reports || reports.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: "No reports found to export" 
      });
    }

    const fields = ["studentName", "testName", "score", "department", "result"];
    const parser = new Parser({ fields });

    const csv = parser.parse(reports);

    res.header("Content-Type", "text/csv");
    res.attachment("reports.csv");
    res.send(csv);
  } catch (error) {
    console.error("Error exporting reports:", error);
    res.status(500).json({ 
      success: false,
      message: "CSV export failed" 
    });
  }
};

module.exports = {
  exportStudents,
  exportReports,
};