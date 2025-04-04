import express from "express";
import { 
    registerStudentController, 
    loginStudent, 
    getStudentById, 
    enrollInCourse, 
    getStudentDashboard, 
    updateStudentPerformanceController ,
    updateStudentInfoController
} from "../controllers/studentController.js";
import { authenticateUser } from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", registerStudentController);
router.post("/signin", loginStudent);
router.get("/:id", authenticateUser, getStudentById);
router.post("/enroll", authenticateUser, enrollInCourse);
router.get("/dashboard", authenticateUser, getStudentDashboard);
router.put("/update-performance", authenticateUser, updateStudentPerformanceController); // NEW API
router.put("/update/studentdata", authenticateUser, updateStudentInfoController); // NEW API
export default router;
