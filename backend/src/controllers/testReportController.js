const TestReport = require("../models/TestReport");

const getTestReports = async (req, res) => {
  try {
    const reports = await TestReport.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch test reports" });
  }
};

const addTestReport = async (req, res) => {
  try {
    const report = await TestReport.create(req.body);

    res.json({
      success: true,
      message: "Test report added successfully",
      report,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add test report" });
  }
};

const updateTestReport = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await TestReport.findByIdAndUpdate(id, req.body, {
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
    res.status(500).json({ success: false, message: "Failed to update test report" });
  }
};

const deleteTestReport = async (req, res) => {
  try {
    const { id } = req.params;

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
    res.status(500).json({ success: false, message: "Failed to delete test report" });
  }
};

module.exports = {
  getTestReports,
  addTestReport,
  updateTestReport,
  deleteTestReport,
};