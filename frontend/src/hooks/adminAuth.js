import axios from 'axios';

export const AdminLoginRequest = async (email, password) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/admin/login',  // Update the URL as needed
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response.data);
    
    return response.data;  // Expected to contain a token or user data
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Login failed');
  }
};


export const AddCourseRequest = async (courseData, adminToken) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/admin/upload-course',
      courseData,
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
          'Content-Type': 'multipart/form-data', // For file uploads
        },
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to upload course');
  }
};