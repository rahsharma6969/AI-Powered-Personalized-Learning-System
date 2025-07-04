import Course from "../models/CourseModel.js";
import crudRepository from "./crudRepository.js";
const courseRepository = {
  ...crudRepository(Course), // Inherit basic CRUD operations
   getAllCourses: async function(title)  {
    return await Course.find().populate("videos");
  },

  getByTitle: async function (title) {
    return await Course.findOne({ title });
  },

  getEnrolledStudents: async function (courseId) {
    return await Course.findById(courseId).populate("students");
  },

  addStudentToCourse: async function (courseId, studentId) {
    return await Course.findByIdAndUpdate(
      courseId,
      { $addToSet: { students: studentId } },
      { new: true }
    ).populate("students");
  },
};

export default courseRepository;
