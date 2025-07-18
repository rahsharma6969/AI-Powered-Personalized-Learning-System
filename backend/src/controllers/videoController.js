// controllers/videoController.js
import { uploadVideoToCourse, fetchAllVideos, fetchVideoById } from "../services/videoService.js";


export const uploadVideo = async (req, res) => {
  try {
    const { title, url, courseId } = req.body;

    if (!title || !url || !courseId) {
      return res.status(400).json({ error: "All fields required" });
    }

   const { video, course } = await uploadVideoToCourse(courseId, { title, url, courseId });


    res.status(201).json({ message: "Uploaded", video, course });

  } catch (error) {
    console.error("Upload Video Error:", error);
    res.status(500).json({ error: error.message });
  }
};


export const getVideos = async (req, res) => {
  try {
    const { courseId } = req.query;
    const videos = await fetchAllVideos(courseId);

    res.status(200).json({
      success: true,
      data: videos,
    });
  } catch (error) {
    console.error("Fetch Videos Error:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

export const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await fetchVideoById(id);

    if (!video) {
      return res.status(404).json({ success: false, error: "Video not found" });
    }

    res.status(200).json({ success: true, data: video });
  } catch (error) {
    console.error("Fetch Video by ID Error:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
