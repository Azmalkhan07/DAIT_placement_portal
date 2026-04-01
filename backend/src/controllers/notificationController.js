const Notification = require("../models/Notification");

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch notifications" });
  }
};

const addNotification = async (req, res) => {
  try {
    const notification = await Notification.create(req.body);

    res.json({
      success: true,
      message: "Notification added successfully",
      notification,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add notification" });
  }
};

const updateNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.json({
      success: true,
      message: "Notification updated successfully",
      notification,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update notification" });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByIdAndDelete(id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete notification" });
  }
};

module.exports = {
  getNotifications,
  addNotification,
  updateNotification,
  deleteNotification,
};