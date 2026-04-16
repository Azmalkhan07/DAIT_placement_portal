const Schedule = require("../models/Schedule");

const getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find().sort({ createdAt: -1 });
    res.json(schedules);
  } catch (error) {
    console.error("Error fetching schedules:", error);
    res.status(500).json({ success: false, message: "Failed to fetch schedules" });
  }
};

const addSchedule = async (req, res) => {
  try {
    const { title, description, startDate, endDate } = req.body;

    // Input validation
    if (!title || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Title, start date, and end date are required",
      });
    }

    if (typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid title",
      });
    }

    const schedule = await Schedule.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      startDate,
      endDate,
    });

    res.json({
      success: true,
      message: "Schedule added successfully",
      schedule,
    });
  } catch (error) {
    console.error("Error adding schedule:", error);
    res.status(500).json({ success: false, message: "Failed to add schedule" });
  }
};

const updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid schedule ID",
      });
    }

    // Whitelist allowed fields
    const allowedFields = ['title', 'description', 'startDate', 'endDate'];
    const updateData = {};
    
    allowedFields.forEach(field => {
      if (req.body.hasOwnProperty(field) && req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const schedule = await Schedule.findByIdAndUpdate(id, updateData, {
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
    console.error("Error updating schedule:", error);
    res.status(500).json({ success: false, message: "Failed to update schedule" });
  }
};

const deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid schedule ID",
      });
    }

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
    console.error("Error deleting schedule:", error);
    res.status(500).json({ success: false, message: "Failed to delete schedule" });
  }
};

module.exports = {
  getSchedules,
  addSchedule,
  updateSchedule,
  deleteSchedule,
};