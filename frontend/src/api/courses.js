import axios from "../config/axiosConifg";


// export const AddCourseRequest = async (courseData, token) => {
//   try {
//     const response = await axios.post("http://localhost:5000/admin/upload-course", courseData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       withCredentials: true, // if backend uses cookies/sessions
//     });

//     return response.data;
//   } catch (error) {
//     console.error("❌ Failed to add course:", error.response?.data || error.message);
//     throw error;
//   }
// };

export const AddCourseRequest = async (formData, token) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/admin/upload-course',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token // ✅ no "Bearer "
        },
        withCredentials: true, // optional: only needed if your backend uses cookies
      }
    );
    return response.data;
  } catch (error) {
    console.error('❌ Failed to add course: ', error.response?.data || error.message);
    throw error;
  }
};