const express = require("express");
const router = express.Router();

const {
  exportStudents,
  exportReports,
} = require("../controllers/exportController");

router.get("/students", exportStudents);
router.get("/reports", exportReports);

module.exports = router;