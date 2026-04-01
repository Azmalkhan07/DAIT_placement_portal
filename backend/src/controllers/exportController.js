const { Parser } = require("json2csv");
const Student = require("../models/Student");
const TestReport = require("../models/TestReport");

const exportStudents = async (req, res) => {
  try {
    const students = await Student.find();

    const fields = ["name", "email", "department", "year", "status"];
    const parser = new Parser({ fields });

    const csv = parser.parse(students);

    res.header("Content-Type", "text/csv");
    res.attachment("students.csv");
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: "CSV export failed" });
  }
};

const exportReports = async (req, res) => {
  try {
    const reports = await TestReport.find();

    const fields = ["studentName", "testName", "score", "department", "result"];
    const parser = new Parser({ fields });

    const csv = parser.parse(reports);

    res.header("Content-Type", "text/csv");
    res.attachment("reports.csv");
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: "CSV export failed" });
  }
};

module.exports = {
  exportStudents,
  exportReports,
};