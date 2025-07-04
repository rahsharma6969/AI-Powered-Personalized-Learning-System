import mongoose from "mongoose";
import Video from "./VideoModel.js"; 

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    isFree: { type: Boolean, default: true },
    coverImage: { type: String },
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }]
 // embed video schema
});

export default mongoose.model("Course", courseSchema);
