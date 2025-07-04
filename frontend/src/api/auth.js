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








// export const RegisterRequest = async (userData) => {
//   try {
//     // Log all the data being sent
//     console.log('RegisterRequest received data:', userData);
//     console.log('Name specifically:', userData.name);
    
//     const response = await axios.post(
//       'http://localhost:5000/api/students/signup',
//       userData, // Send the entire userData object
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );
//     return response.data;
//   } catch (err) {
//     throw new Error(err.response?.data?.message || 'User registration failed');
//   }
// };

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