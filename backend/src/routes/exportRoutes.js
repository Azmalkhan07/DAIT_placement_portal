const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  exportStudents,
  exportReports,
} = require("../controllers/exportController");

router.get("/students", protect, exportStudents);
router.get("/reports", protect, exportReports);

module.exports = router;