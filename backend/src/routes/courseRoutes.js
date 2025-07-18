import express from "express";
import { createCourseController, getAllCourses, getCourseById, updateCourse, deleteCourse, getCourseVideos, getCourseByIdExpectVideoController, getCoursePaymentInfo } from "../controllers/courseController.js";

const router = express.Router();

router.post("/", createCourseController);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);
router.get('/:courseId/videos', getCourseVideos);
router.get('/:id/details', getCourseByIdExpectVideoController);
router.get("/payment-info/:courseId", getCoursePaymentInfo);
export default router;
