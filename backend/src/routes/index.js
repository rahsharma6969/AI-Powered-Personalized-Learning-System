import express from "express";
import studentRoutes from "./studentRoutes.js";
import courseRoutes from "./courseRoutes.js";
import assessmentRoutes from "./assementRoutes.js";
import questionRoutes from "./questionRoutes.js";
import resultrouter from "./resultRoutes.js";
import { getRecommendations } from "../controllers/recommendationController.js";
import { authenticateUser } from "../middlewares/auth.js";
import Survey from "../models/SurveyModel.js"; // Adjust the path as necessary
const router = express.Router();

router.use("/students", studentRoutes);
router.use("/courses", courseRoutes);
router.use("/assessments", assessmentRoutes);
router.use("/questions", questionRoutes);
router.use("/results", resultrouter);


router.post("/assessments/survey/:userId", async (req, res) => {
    try {
      // Extract the data from the request body
      const {
        satisfaction,
        difficulty,
        preferredMaterial,
        timeSpentStudying,
        motivationLevel,
        comments,
      } = req.body;

      const { userId } = req.params;

    //   console.log( userId);
       
      // Create a new Survey instance
      const newSurvey = new Survey({
        satisfaction,
        difficulty,
        preferredMaterial,
        timeSpentStudying,
        motivationLevel,
        comments,
        userId
      });
  
      // Save the survey to the database
      await newSurvey.save();
  
      // Send a response back to the client
      res.status(200).json({ message: "Survey submitted successfully", survey: newSurvey });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while submitting the survey" });
    }
  });
  

router.post('/recommend', getRecommendations);

export default router;
