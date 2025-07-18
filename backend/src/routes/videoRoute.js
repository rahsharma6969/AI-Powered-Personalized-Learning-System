// routes/videoRoutes.js
import express from "express";
import { uploadVideo, getVideos, getVideoById } from "../controllers/videoController.js";

const router = express.Router();

// Route: POST /api/videos/upload/:courseId
router.post("/upload/", uploadVideo);
router.get("/", getVideos);
router.get("/:id", getVideoById);


export default router;
