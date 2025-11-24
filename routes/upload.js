import express from "express";
import upload from "../config/multer.js";
import uploadFileWithContact from "../controllers/uploadController.js";

const router = express.Router();

router.post("/", upload.single("file"), uploadFileWithContact, controller.uploadFileWithContact);

export default router;