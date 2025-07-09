import Student from "../models/StudentModel.js";
import crudRepository from "./crudRepository.js";

const studentRepository = {
  ...crudRepository(Student), // Inherit basic CRUD operations

  // getByEmail: async function (email) {
  //   return await Student.findOne({ email }).populate("courses assessments");
  // },
  getByEmail: async function (email) {
    const user = await Student.findOne({ email });
    // console.log(user);
    
    return user;
    },
  enrollInCourse: async function (studentId, courseId) {
    return await Student.findByIdAndUpdate(
      studentId,
      { $addToSet: { courses: courseId } }, // Prevent duplicate enrollments
      { new: true }
    ).populate("courses");
  },

  addAssessment: async function (studentId, assessmentId) {
    return await Student.findByIdAndUpdate(
      studentId,
      { $push: { assessments: assessmentId } },
      { new: true }
    ).populate("assessments");
  },

   // repositories/studentRepository.js
getStudentById: async (studentId) => {
  return await Student.findById(studentId)
    .populate("assessments")
    .populate("courses");
}

};

export default studentRepository;
