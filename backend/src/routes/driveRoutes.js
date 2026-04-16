const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  getDrives,
  addDrive,
  updateDrive,
  deleteDrive,
} = require("../controllers/driveController");

router.get("/", protect, getDrives);
router.post("/", protect, addDrive);
router.put("/:id", protect, updateDrive);
router.delete("/:id", protect, deleteDrive);

module.exports = router;