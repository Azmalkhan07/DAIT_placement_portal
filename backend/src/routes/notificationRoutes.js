const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  getNotifications,
  addNotification,
  updateNotification,
  deleteNotification,
} = require("../controllers/notificationController");

router.get("/", protect, getNotifications);
router.post("/", protect, addNotification);
router.put("/:id", protect, updateNotification);
router.delete("/:id", protect, deleteNotification);

module.exports = router;