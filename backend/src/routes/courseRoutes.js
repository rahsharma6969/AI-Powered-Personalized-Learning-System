import express from "express";
import { createCourseController, getAllCourses, getCourseById, updateCourse, deleteCourse } from "../controllers/courseController.js";

const router = express.Router();

router.post("/", createCourseController);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;
