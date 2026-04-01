const express = require("express");
const router = express.Router();

const {
  getTestReports,
  addTestReport,
  updateTestReport,
  deleteTestReport,
} = require("../controllers/testReportController");

router.get("/", getTestReports);
router.post("/", addTestReport);
router.put("/:id", updateTestReport);
router.delete("/:id", deleteTestReport);

module.exports = router;