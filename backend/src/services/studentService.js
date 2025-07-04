import studentRepository from "../repository/studentRepository.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// export const registerStudentService = async (data) => {
//   const { email, firstName, lastName, password } = data;

//   // Combine firstName and lastName into a full name
//   const studentData = {
//     name: `${firstName} ${lastName}`.trim(),  // trimming in case lastName is optional
//     email,
//     password,
//   };

//   const existingStudent = await studentRepository.getByEmail(email);
//   if (existingStudent) throw new Error("Email already registered");

//   return await studentRepository.create(studentData);
// };

export const registerStudentService = async (data) => {
  const { email, firstName, lastName, password, school, phone, standard } = data;
  
  // Combine firstName and lastName into a full name
  const studentData = {
    name: `${firstName} ${lastName}`.trim(),
    email,
    password,
  };
  
  // Add optional fields if they exist
  if (school) studentData.school = school;
  if (phone) studentData.phone = phone;
  if (standard) studentData.standard = standard;
  
  const existingStudent = await studentRepository.getByEmail(email);
  if (existingStudent) throw new Error("Email already registered");
  
  return await studentRepository.create(studentData);
};

export const loginStudentService = async (email, password) => {
  const student = await studentRepository.getByEmail(email);
  if (!student) throw new Error("User does not exist");

  // Compare the provided password with the hashed password stored in the database
  const isPasswordValid = await bcrypt.compare(password, student.password);
  if (!isPasswordValid) throw new Error("Invalid password");

  // Generate the JWT token
  const token = jwt.sign(
    { id: student._id, email: student.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { student, token };
};

export const getStudentById = async (studentId) => {
  return await studentRepository.getById(studentId);
};

export const enrollInCourse = async (studentId, courseId) => {
  return await studentRepository.enrollCourse(studentId, courseId);
};

export const updateStudentPerformance = async (studentId, subject, score) => {
  const student = await studentRepository.findById(studentId);
  if (!student) throw new Error("Student not found");

  student.subjectPerformance[subject] = score;
  await student.save();

  return student;
};



export const updateStudentInfoService = async (data, user) => {
  try {
    const studentId = user.id || user._id 
    
    const student = await studentRepository.getById(studentId);
    if (!student) throw new Error("Student not found");
    
    const updatedStudent = await studentRepository.updateById(studentId, data);
    return updatedStudent; // Return the updated student data
  } catch (error) {
    throw new Error(`Error updating student info: ${error.message}`);
  }
};