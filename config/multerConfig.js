const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadFolder = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadFolder,
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random()*1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

function fileFilter (req, file, cb) {
  // Example: allow all types; you can restrict by MIME type or extension here
  cb(null, true);
}

module.exports = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
  fileFilter
});
