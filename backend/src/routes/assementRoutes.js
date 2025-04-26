import express from "express";
import {
  createAssessmentController,
  getAllAssessments,
  getAssessmentById,
  updateAssessment,
  deleteAssessment,
} from "../controllers/assessmentController.js";
import AssessmentResult from "../models/AssessmentResult.js";
import { authenticateUser } from "../middlewares/auth.js";
import mongoose from "mongoose";

const router = express.Router();

router.post("/", createAssessmentController);
router.get("/", getAllAssessments);
router.get("/:id", getAssessmentById);
router.put("/:id", updateAssessment);
router.delete("/:id", deleteAssessment);

router.post("/submit", authenticateUser, async (req, res) => {
  try {
    const {
      subject,
      totalQuestions,
      correctAnswers,
      score,
      timeSpent,
      detailedResponses,
      subTopicStats, // Add this field to receive subTopicStats
    } = req.body;

    // Create new assessment result
    const assessmentResult = new AssessmentResult({
      user: req.user.id, // From auth middleware
      subject,
      totalQuestions,
      correctAnswers,
      score,
      timeSpent,
      detailedResponses,
      subTopicStats, // Store the subTopicStats
      completedAt: new Date(),
    });

    await assessmentResult.save();

    res.status(201).json({
      message: "Assessment results saved successfully",
      resultId: assessmentResult._id,
    });
  } catch (error) {
    console.error("Error saving assessment results:", error);
    res.status(500).json({ error: "Failed to save assessment results" });
  }
});

router.get("/history/:userId", authenticateUser, async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Requested for user ID:", userId);

    const assessments = await AssessmentResult.find({
      user: new mongoose.Types.ObjectId(userId),
    })
      .sort({ completedAt: -1 })
      .select("-detailedResponses");

    console.log(assessments);

    res.json(assessments);
  } catch (error) {
    console.error("Error fetching assessment history:", error);
    res.status(500).json({ error: "Failed to fetch assessment history" });
  }
});

// Get specific assessment result with details
router.get("/result/:id", authenticateUser, async (req, res) => {
  try {
    const assessment = await AssessmentResult.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!assessment) {
      return res.status(404).json({ error: "Assessment result not found" });
    }

    res.json(assessment);
  } catch (error) {
    console.error("Error fetching assessment result:", error);
    res.status(500).json({ error: "Failed to fetch assessment result" });
  }
});


// Add this endpoint to fetch a specific assessment report
router.get("/report/:reportId", authenticateUser, async (req, res) => {
  try {
    const report = await AssessmentResult.findById(req.params.reportId);
    
    if (!report) {
      return res.status(404).json({ error: "Assessment report not found" });
    }
    
    // Ensure the report belongs to the requesting user
    if (report.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized to view this report" });
    }
    
    res.json(report);
  } catch (error) {
    console.error("Error fetching assessment report:", error);
    res.status(500).json({ error: "Failed to fetch assessment report" });
  }
});

// Add an endpoint to fetch all reports for a user
router.get("/reports", authenticateUser, async (req, res) => {
  try {
    // Find all assessment results for the authenticated user
    // Project only the necessary fields for listing
    const reports = await AssessmentResult
      .find({ user: req.user.id })
      .select('subject totalQuestions correctAnswers score timeSpent subTopicStats completedAt')
      .sort({ completedAt: -1 });
    
    res.json(reports);
  } catch (error) {
    console.error("Error fetching user assessment reports:", error);
    res.status(500).json({ error: "Failed to fetch assessment reports" });
  }
});
export default router;
