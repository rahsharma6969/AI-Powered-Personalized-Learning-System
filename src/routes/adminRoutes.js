import express from "express";
import { createAssessmentController } from "../controllers/assessmentController.js";
import { createCourseController } from "../controllers/courseController.js";
import { authenticateUser, adminAuth } from "../middlewares/auth.js";
import { adminLogin } from "../controllers/adminController.js";


const router = express.Router();
// Upload Assessment
router.post('/upload-assessment', adminAuth, createAssessmentController);

// Upload Course
router.post('/upload-course', adminAuth, createCourseController);
router.post('/login', adminLogin);

export default router;
