import Course from "../models/CourseModel.js";
import crudRepository from "./crudRepository.js";
import mongoose from "mongoose";

const courseRepository = {
  ...crudRepository(Course), // Inherit basic CRUD operations
  getAllCourses: async function (title) {
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

  getCourseWithVideos: async function (courseId) {
    return Course.findById(courseId).populate("videos").exec();
  },

  getDetailCourse: async function (courseId, populateFields = "") {
    console.log(mongoose.Types.ObjectId.isValid(courseId));
    const course = await Course.findById(courseId)
    .populate(populateFields)
    .select("-videos");

  return course ? course.toObject() : null;
  },
  findCourseById: async function (courseId) {
    try {
      const course = await Course.findById(courseId).select(
        "isFree price title"
      );
      return course;
    } catch (err) {
      throw new Error("Error fetching course");
    }
  },
};

export default courseRepository;
