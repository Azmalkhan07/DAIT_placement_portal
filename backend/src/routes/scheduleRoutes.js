const express = require("express");
const router = express.Router();

const {
  getSchedules,
  addSchedule,
  updateSchedule,
  deleteSchedule,
} = require("../controllers/scheduleController");

router.get("/", getSchedules);
router.post("/", addSchedule);
router.put("/:id", updateSchedule);
router.delete("/:id", deleteSchedule);

module.exports = router;