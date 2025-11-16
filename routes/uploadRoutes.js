const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const controller = require("../controllers/uploadController");

router.post("/", upload.single("file"), controller.uploadFile);
router.get("/", controller.listFiles);

module.exports = router;
