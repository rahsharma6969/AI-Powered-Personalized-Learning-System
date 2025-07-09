// repositories/videoRepository.js
import Video from "../models/VideoModel.js";
import Course from "../models/CourseModel.js";
import crudRepository from "./crudRepository.js";

const videoRepository = {
  ...crudRepository(Video),

  async addVideoToCourse(courseId, videoId) {
    return await Course.findByIdAndUpdate(
      courseId,
      { $push: { videos: videoId } },
      { new: true }
    ).populate("videos");
  }
};

export default videoRepository;
