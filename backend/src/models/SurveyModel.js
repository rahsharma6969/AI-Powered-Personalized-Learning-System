import mongoose from "mongoose";

const surveySchema = new mongoose.Schema({
    satisfaction: { type: String, required: true },
    difficulty: { type: String, required: true },
    preferredMaterial: { type: String, required: true },
    timeSpentStudying: { type: Number, required: true },
    motivationLevel: { type: String, required: true },
    comments: { type: String, required: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Optional, if you need to link to a user
    createdAt: { type: Date, default: Date.now }
  });
  
  const Survey = mongoose.model("Survey", surveySchema);
  export default Survey;