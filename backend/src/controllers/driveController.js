const Drive = require("../models/Drive");

const getDrives = async (req, res) => {
  try {
    const drives = await Drive.find().sort({ createdAt: -1 });
    res.json(drives);
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch drives" });
  }
};

const addDrive = async (req, res) => {
  try {
    const drive = await Drive.create(req.body);

    res.json({
      success: true,
      message: "Drive added successfully",
      drive,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add drive" });
  }
};

const updateDrive = async (req, res) => {
  try {
    const { id } = req.params;

    const drive = await Drive.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!drive) {
      return res.status(404).json({
        success: false,
        message: "Drive not found",
      });
    }

    res.json({
      success: true,
      message: "Drive updated successfully",
      drive,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update drive" });
  }
};

const deleteDrive = async (req, res) => {
  try {
    const { id } = req.params;

    const drive = await Drive.findByIdAndDelete(id);

    if (!drive) {
      return res.status(404).json({
        success: false,
        message: "Drive not found",
      });
    }

    res.json({
      success: true,
      message: "Drive deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete drive" });
  }
};

module.exports = {
  getDrives,
  addDrive,
  updateDrive,
  deleteDrive,
};