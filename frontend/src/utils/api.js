import axios from 'axios';

// Base API URL - in a real app, this would come from .env
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // If token exists, add it to request headers
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 (Unauthorized) and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // In a real app, we would try to refresh the token here
        // const refreshToken = localStorage.getItem('refreshToken');
        // const response = await axios.post(`${API_URL}/auth/refresh-token`, { refreshToken });
        // const { token } = response.data;
        // localStorage.setItem('token', token);
        // originalRequest.headers['Authorization'] = `Bearer ${token}`;
        // return api(originalRequest);
        
        // For demo purposes, just log out the user
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Redirect to login page
        window.location.href = '/login';
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;