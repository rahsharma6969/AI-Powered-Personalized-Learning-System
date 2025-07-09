// routes/videoRoutes.js
import express from "express";
import { uploadVideo } from "../controllers/videoController.js";

const router = express.Router();

// Route: POST /api/videos/upload/:courseId
router.post("/upload/", uploadVideo);

export default router;
