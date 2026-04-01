const express = require("express");
const router = express.Router();

const {
  getNotifications,
  addNotification,
  updateNotification,
  deleteNotification,
} = require("../controllers/notificationController");

router.get("/", getNotifications);
router.post("/", addNotification);
router.put("/:id", updateNotification);
router.delete("/:id", deleteNotification);

module.exports = router;