const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  getTestReports,
  addTestReport,
  updateTestReport,
  deleteTestReport,
} = require("../controllers/testReportController");

router.get("/", protect, getTestReports);
router.post("/", protect, addTestReport);
router.put("/:id", protect, updateTestReport);
router.delete("/:id", protect, deleteTestReport);

module.exports = router;