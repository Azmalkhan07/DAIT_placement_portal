const express = require("express");
const router = express.Router();

const {
  getDrives,
  addDrive,
  updateDrive,
  deleteDrive,
} = require("../controllers/driveController");

router.get("/", getDrives);
router.post("/", addDrive);
router.put("/:id", updateDrive);
router.delete("/:id", deleteDrive);

module.exports = router;