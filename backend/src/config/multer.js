const multer = require("multer");
const path = require("path");
const fs = require("fs");

const createStorage = (folder) => {
  const dir = path.join(__dirname, "../../uploads", folder);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  });
};

const resumeUpload = multer({
  storage: createStorage("resumes"),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const profileUpload = multer({
  storage: createStorage("profiles"),
  limits: { fileSize: 3 * 1024 * 1024 },
});

module.exports = {
  resumeUpload,
  profileUpload,
};