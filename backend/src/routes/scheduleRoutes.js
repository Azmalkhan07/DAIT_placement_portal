const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  getSchedules,
  addSchedule,
  updateSchedule,
  deleteSchedule,
} = require("../controllers/scheduleController");

router.get("/", protect, getSchedules);
router.post("/", protect, addSchedule);
router.put("/:id", protect, updateSchedule);
router.delete("/:id", protect, deleteSchedule);

module.exports = router;