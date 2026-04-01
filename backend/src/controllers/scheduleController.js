const Schedule = require("../models/Schedule");

const getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find().sort({ createdAt: -1 });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch schedules" });
  }
};

const addSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.create(req.body);

    res.json({
      success: true,
      message: "Schedule added successfully",
      schedule,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add schedule" });
  }
};

const updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    const schedule = await Schedule.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: "Schedule not found",
      });
    }

    res.json({
      success: true,
      message: "Schedule updated successfully",
      schedule,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update schedule" });
  }
};

const deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    const schedule = await Schedule.findByIdAndDelete(id);

    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: "Schedule not found",
      });
    }

    res.json({
      success: true,
      message: "Schedule deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete schedule" });
  }
};

module.exports = {
  getSchedules,
  addSchedule,
  updateSchedule,
  deleteSchedule,
};