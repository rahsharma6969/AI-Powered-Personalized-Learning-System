import axios from "../config/axiosConifg";

export const LoginRequest = async (email, password) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/students/signin',  // Update the URL as needed
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


export const RegisterRequest = async ({ firstName, lastName, email, password, school, phone, standard }) => {
  try {
    console.log('RegisterRequest received:', { firstName, lastName, email, password, school, phone, standard });
    console.log('firstName specifically:', firstName);
    console.log('lastName specifically:', lastName);
    
    // Create the payload object, only including fields that have values
    const payload = { firstName, lastName, email, password };
    
    if (school) payload.school = school;
    if (phone) payload.phone = phone;
    if (standard) payload.standard = standard;
    
    console.log('Sending payload:', payload);
    
    const response = await axios.post(
      'http://localhost:5000/api/students/signup',
      payload,
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


// src/api/student.js

export const fetchStudentProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await fetch('http://localhost:5000/api/students/profile', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};
