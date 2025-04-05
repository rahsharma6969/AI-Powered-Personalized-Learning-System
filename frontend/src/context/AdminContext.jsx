import { createContext, useContext, useState, useEffect } from 'react';

// Create context
export const AdminContext = createContext();

// Provider component
export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('adminToken') || null);
  const [loading, setLoading] = useState(true);

  // Load admin data from localStorage on initialization
  useEffect(() => {
    const loadAdminData = () => {
      try {
        const storedToken = localStorage.getItem('adminToken');
        const storedAdminData = localStorage.getItem('adminData');
        
        if (storedToken && storedAdminData) {
          setToken(storedToken);
          setAdmin(JSON.parse(storedAdminData));
        }
      } catch (error) {
        console.error('Error loading admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAdminData();
  }, []);

  // Login function
  const adminLogin = (data) => {
    if (!data) return;
    
    console.log('Admin login data:', data);
    
    // Store token in state
    setToken(data.token);
    
    // Store admin data in state
    setAdmin(data.admin);
    
    // Store in localStorage
    localStorage.setItem('adminToken', data.token);
    localStorage.setItem('adminData', JSON.stringify(data.admin));
  };

  // Logout function
  const adminLogout = () => {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
  };

  // Check if admin is authenticated
  const isAuthenticated = !!token && !!admin;

  const value = {
    admin,
    token,
    adminLogin,
    adminLogout,
    isAuthenticated,
    loading
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};