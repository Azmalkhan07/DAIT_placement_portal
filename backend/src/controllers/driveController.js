const Drive = require("../models/Drive");

const getDrives = async (req, res) => {
  try {
    const drives = await Drive.find().sort({ createdAt: -1 });
    res.json(drives);
  } catch (error) {
    console.error("Error fetching drives:", error);
    res.status(500).json({ success: false, message: "Failed to fetch drives" });
  }
};

const addDrive = async (req, res) => {
  try {
    const { companyName, driveDate, position, salary } = req.body;

    // Input validation
    if (!companyName || !driveDate || !position) {
      return res.status(400).json({
        success: false,
        message: "Company name, drive date, and position are required",
      });
    }

    if (typeof companyName !== 'string' || companyName.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid company name",
      });
    }

    const drive = await Drive.create({
      companyName: companyName.trim(),
      driveDate,
      position: position.trim(),
      salary: salary ? salary.trim() : '',
    });

    res.json({
      success: true,
      message: "Drive added successfully",
      drive,
    });
  } catch (error) {
    console.error("Error adding drive:", error);
    res.status(500).json({ success: false, message: "Failed to add drive" });
  }
};

const updateDrive = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid drive ID",
      });
    }

    // Whitelist allowed fields
    const allowedFields = ['companyName', 'driveDate', 'position', 'salary'];
    const updateData = {};
    
    allowedFields.forEach(field => {
      if (req.body.hasOwnProperty(field) && req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const drive = await Drive.findByIdAndUpdate(id, updateData, {
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
    console.error("Error updating drive:", error);
    res.status(500).json({ success: false, message: "Failed to update drive" });
  }
};

const deleteDrive = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid drive ID",
      });
    }

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
    console.error("Error deleting drive:", error);
    res.status(500).json({ success: false, message: "Failed to delete drive" });
  }
};

module.exports = {
  getDrives,
  addDrive,
  updateDrive,
  deleteDrive,
};