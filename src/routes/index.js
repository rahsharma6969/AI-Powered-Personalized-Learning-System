import express from "express";
import studentRoutes from "./studentRoutes.js";
import courseRoutes from "./courseRoutes.js";
import assessmentRoutes from "./assementRoutes.js";
import questionRoutes from "./questionRoutes.js";
import { getRecommendations } from "../controllers/recommendationController.js";
const router = express.Router();

router.use("/students", studentRoutes);
router.use("/courses", courseRoutes);
router.use("/assessments", assessmentRoutes);
router.use("/questions", questionRoutes);




router.post('/recommend', getRecommendations);

export default router;
