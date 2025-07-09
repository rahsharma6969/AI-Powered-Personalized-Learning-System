// controllers/videoController.js
import { uploadVideoToCourse } from "../services/videoService.js";

export const uploadVideo = async (req, res) => {
  try {
    const { title, url, courseId } = req.body;

    if (!title || !url || !courseId) {
      return res.status(400).json({ error: "All fields required" });
    }

    const { video, course } = await uploadVideoToCourse({ title, url }, courseId);

    res.status(201).json({ message: "Uploaded", video, course });

  } catch (error) {
    console.error("Upload Video Error:", error);
    res.status(500).json({ error: error.message });
  }
};
