// videoSchema.js (if you want to keep it modular)
import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    duration: { type: Number },
    order: { type: Number },
});

// export default videoSchema;
export default mongoose.model("Video", videoSchema);
