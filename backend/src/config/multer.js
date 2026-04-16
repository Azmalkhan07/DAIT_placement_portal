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

const fileFilter = (allowedMimes) => {
  return (req, file, cb) => {
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type. Expected: ${allowedMimes.join(", ")}`), false);
    }
  };
};

const resumeUpload = multer({
  storage: createStorage("resumes"),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter(['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']),
});

const profileUpload = multer({
  storage: createStorage("profiles"),
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: fileFilter(['image/jpeg', 'image/png', 'image/gif', 'image/webp']),
});

module.exports = {
  resumeUpload,
  profileUpload,
};