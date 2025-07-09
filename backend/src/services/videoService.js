// services/videoService.js
import videoRepository from "../repository/videoRepository.js";


  export const uploadVideoToCourse = async (courseId, videoData) => {
    const video = await videoRepository.create(videoData);
    const updatedCourse = await videoRepository.addVideoToCourse(courseId, video._id);
    return { video, updatedCourse };
  }



