const express = require("express");
const router = express.Router();
const {
  getUsers,
  uploadResume,
  uploadProfileImage,
} = require("../controllers/userController");
const { resumeUpload, profileUpload } = require("../config/multer");

router.get("/", getUsers);
router.post("/upload-resume/:id", resumeUpload.single("resume"), uploadResume);
router.post("/upload-profile/:id", profileUpload.single("profile"), uploadProfileImage);

module.exports = router;