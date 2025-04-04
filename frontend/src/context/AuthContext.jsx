import React, { createContext, useState, useEffect } from 'react';

// Create auth context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Check if user is already logged in (from localStorage or sessionStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);
  
  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, you would make an API call to authenticate
      // For demo purposes, we're simulating a successful login
      const mockUserData = {
        id: '123456',
        firstName: 'John',
        lastName: 'Smith',
        email: email,
        grade: '11th Grade',
        school: 'Lincoln High School',
        avatar: 'https://placehold.co/200x200?text=JS',
        role: 'student'
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save user data
      setCurrentUser(mockUserData);
      localStorage.setItem('user', JSON.stringify(mockUserData));
      
      return mockUserData;
    } catch (error) {
      setError(error.message || 'An error occurred during login');
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Signup function
  const signup = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, you would make an API call to register a new user
      // For demo purposes, we're simulating a successful registration
      const { firstName, lastName, email, password } = userData;
      
      const mockUserData = {
        id: '123456',
        firstName,
        lastName,
        email,
        grade: userData.grade || '11th Grade',
        school: userData.school || 'Lincoln High School',
        avatar: 'https://placehold.co/200x200?text=' + firstName.charAt(0) + lastName.charAt(0),
        role: 'student'
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save user data
      setCurrentUser(mockUserData);
      localStorage.setItem('user', JSON.stringify(mockUserData));
      
      return mockUserData;
    } catch (error) {
      setError(error.message || 'An error occurred during signup');
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };
  
  // Update user profile
  const updateProfile = async (updates) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, you would make an API call to update the user profile
      // For demo purposes, we're simulating a successful update
      const updatedUser = {
        ...currentUser,
        ...updates
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save updated user data
      setCurrentUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return updatedUser;
    } catch (error) {
      setError(error.message || 'An error occurred during profile update');
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, you would make an API call to change the password
      // For demo purposes, we're simulating a successful password change
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return true;
    } catch (error) {
      setError(error.message || 'An error occurred during password change');
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Reset password (forgot password flow)
  const resetPassword = async (email) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, you would make an API call to trigger password reset
      // For demo purposes, we're simulating a successful request
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return true;
    } catch (error) {
      setError(error.message || 'An error occurred during password reset');
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Context value
  const value = {
    currentUser,
    loading,
    error,
    login,
    signup,
    logout,
    updateProfile,
    changePassword,
    resetPassword
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};