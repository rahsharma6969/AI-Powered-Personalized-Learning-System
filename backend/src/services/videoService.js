// services/videoService.js
import videoRepository from "../repository/videoRepository.js";


  export const uploadVideoToCourse = async (courseId, videoData) => {
    const video = await videoRepository.create(videoData);
    await video.save();
    if (!video._id) {
    throw new Error("Video creation failed. No _id returned.");
  }
    const updatedCourse = await videoRepository.addVideoToCourse(courseId, video._id);
    return { video, updatedCourse };
  }

  export const fetchAllVideos = async (courseId) => {
    return await videoRepository.getAllVideos();
  
};

export const fetchVideoById = async (id) => {
  return await videoRepository.getVideoById(id); // ✅ Correct method
};





