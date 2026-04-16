const TestReport = require("../models/TestReport");

const getTestReports = async (req, res) => {
  try {
    const reports = await TestReport.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    console.error("Error fetching test reports:", error);
    res.status(500).json({ success: false, message: "Failed to fetch test reports" });
  }
};

const addTestReport = async (req, res) => {
  try {
    const { studentName, testName, score } = req.body;

    // Input validation
    if (!studentName || !testName || score === undefined || score === null) {
      return res.status(400).json({
        success: false,
        message: "Student name, test name, and score are required",
      });
    }

    if (typeof studentName !== 'string' || studentName.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid student name",
      });
    }

    if (typeof testName !== 'string' || testName.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid test name",
      });
    }

    const scoreNum = parseFloat(score);
    if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 100) {
      return res.status(400).json({
        success: false,
        message: "Score must be a number between 0 and 100",
      });
    }

    const report = await TestReport.create({
      studentName: studentName.trim(),
      testName: testName.trim(),
      score: scoreNum,
      department: req.body.department ? req.body.department.trim() : '',
      result: req.body.result ? req.body.result.trim() : '',
    });

    res.json({
      success: true,
      message: "Test report added successfully",
      report,
    });
  } catch (error) {
    console.error("Error adding test report:", error);
    res.status(500).json({ success: false, message: "Failed to add test report" });
  }
};

const updateTestReport = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid test report ID",
      });
    }

    // Whitelist allowed fields
    const allowedFields = ['studentName', 'testName', 'score', 'department', 'result'];
    const updateData = {};
    
    allowedFields.forEach(field => {
      if (req.body.hasOwnProperty(field) && req.body[field] !== undefined) {
        if (field === 'score') {
          const scoreNum = parseFloat(req.body[field]);
          if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 100) {
            throw new Error("Score must be a number between 0 and 100");
          }
          updateData[field] = scoreNum;
        } else {
          updateData[field] = req.body[field];
        }
      }
    });

    const report = await TestReport.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Test report not found",
      });
    }

    res.json({
      success: true,
      message: "Test report updated successfully",
      report,
    });
  } catch (error) {
    console.error("Error updating test report:", error);
    res.status(500).json({ success: false, message: "Failed to update test report" });
  }
};

const deleteTestReport = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid test report ID",
      });
    }

    const report = await TestReport.findByIdAndDelete(id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Test report not found",
      });
    }

    res.json({
      success: true,
      message: "Test report deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting test report:", error);
    res.status(500).json({ success: false, message: "Failed to delete test report" });
  }
};

module.exports = {
  getTestReports,
  addTestReport,
  updateTestReport,
  deleteTestReport,
};