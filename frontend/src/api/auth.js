import axios from "../config/axiosConifg";

export const LoginRequest = async (email, password) => {
  try {
    const response = await axios.post(
      '/students/signin',  // Update the URL as needed
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Check if response data contains the expected fields
    if (response?.data?.token && response?.data?.student) {
      return response.data;  // Return the entire response data
    } else {
      throw new Error('Invalid response from the server');
    }

  } catch (err) {
    // Provide a more informative error message
    throw new Error(err.response?.data?.message || 'User login failed');
  }
};








export const RegisterRequest = async ({ name, email, password }) => {
  try {
     
    console.log(name, email, password);
    
    const response = await axios.post(
      '/students/signup',
      { name, email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'User registration failed');
  }
};
