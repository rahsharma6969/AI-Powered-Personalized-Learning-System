import api from '../utils/api';

/**
 * Login user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} User data
 */
export const login = async (email, password) => {
  try {
    // For demo purposes, we're simulating a successful login
    // In a real app, you would make an API call to your backend
    
    // Simulate API call
    // const response = await api.post('/auth/login', { email, password });
    // return response.data;
    
    // Mock response
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock user data
    return {
      id: '123456',
      firstName: 'John',
      lastName: 'Smith',
      email: email,
      grade: '11th Grade',
      school: 'Lincoln High School',
      avatar: 'https://placehold.co/200x200?text=JS',
      role: 'student',
      token: 'mock-jwt-token'
    };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} User data
 */
export const register = async (userData) => {
  try {
    // For demo purposes, we're simulating a successful registration
    // In a real app, you would make an API call to your backend
    
    // Simulate API call
    // const response = await api.post('/auth/register', userData);
    // return response.data;
    
    // Mock response
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock user data
    const { firstName, lastName, email } = userData;
    return {
      id: '123456',
      firstName,
      lastName,
      email,
      grade: userData.grade || '11th Grade',
      school: userData.school || 'Lincoln High School',
      avatar: `https://placehold.co/200x200?text=${firstName.charAt(0)}${lastName.charAt(0)}`,
      role: 'student',
      token: 'mock-jwt-token'
    };
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

/**
 * Request password reset for a user
 * @param {string} email - User email
 * @returns {Promise<boolean>} Success status
 */
export const requestPasswordReset = async (email) => {
  try {
    // For demo purposes, we're simulating a successful request
    // In a real app, you would make an API call to your backend
    
    // Simulate API call
    // const response = await api.post('/auth/password-reset-request', { email });
    // return response.data;
    
    // Mock response
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return true;
  } catch (error) {
    console.error('Password reset request error:', error);
    throw error;
  }
};

/**
 * Reset password with token
 * @param {string} token - Reset token
 * @param {string} newPassword - New password
 * @returns {Promise<boolean>} Success status
 */
export const resetPassword = async (token, newPassword) => {
  try {
    // For demo purposes, we're simulating a successful password reset
    // In a real app, you would make an API call to your backend
    
    // Simulate API call
    // const response = await api.post('/auth/password-reset', { token, newPassword });
    // return response.data;
    
    // Mock response
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return true;
  } catch (error) {
    console.error('Password reset error:', error);
    throw error;
  }
};

/**
 * Change user password
 * @param {string} currentPassword - Current password
 * @param {string} newPassword - New password
 * @returns {Promise<boolean>} Success status
 */
export const changePassword = async (currentPassword, newPassword) => {
  try {
    // For demo purposes, we're simulating a successful password change
    // In a real app, you would make an API call to your backend
    
    // Simulate API call
    // const response = await api.post('/auth/change-password', { currentPassword, newPassword });
    // return response.data;
    
    // Mock response
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return true;
  } catch (error) {
    console.error('Password change error:', error);
    throw error;
  }
};