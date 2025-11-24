const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const controller = require("../controllers/uploadController");

router.post(
  "/upload-with-contact",
  upload.single("file"),
  controller.uploadFileWithContact
);

module.exports = router;