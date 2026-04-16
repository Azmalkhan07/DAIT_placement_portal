const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getUsers,
  uploadResume,
  uploadProfileImage,
} = require("../controllers/userController");
const { resumeUpload, profileUpload } = require("../config/multer");

router.get("/", protect, getUsers);
router.post("/upload-resume/:id", protect, resumeUpload.single("resume"), uploadResume);
router.post("/upload-profile/:id", protect, profileUpload.single("profile"), uploadProfileImage);

module.exports = router;