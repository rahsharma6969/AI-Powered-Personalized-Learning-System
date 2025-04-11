import mongoose from "mongoose";

const detailedResponseSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  correctAnswer: {
    type: String,
    required: true
  },
  userAnswer: {
    type: String
  },
  selectedOption: {
    type: String
  },
  isCorrect: {
    type: Boolean,
    required: true
  },
  difficulty: {
    type: String,
    default: 'Not specified'
  }
}, { _id: false });

const assessmentResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  correctAnswers: {
    type: Number,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  timeSpent: {
    type: Number,  // in seconds
    required: true
  },
  detailedResponses: [detailedResponseSchema],
  completedAt: {
    type: Date,
    default: Date.now
  }
});

// Create indexes for better query performance
assessmentResultSchema.index({ user: 1, completedAt: -1 });
assessmentResultSchema.index({ subject: 1 });

const AssessmentResult = mongoose.model('AssessmentResult', assessmentResultSchema);
export default AssessmentResult;