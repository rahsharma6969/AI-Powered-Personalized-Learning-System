import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Set to true initially for loading state
  const navigate = useNavigate();

  // Check localStorage for user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (userData) => {
    try {
      setLoading(true);

      const { student, token } = userData;

      if (!student) {
        console.error("Student data is not available.");
        return;
      }

      // Save token and user to local storage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(student));

      // Set user state
      setUser(student);
      console.log("User set successfully: ", student);

      // Navigate to the dashboard after login
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};