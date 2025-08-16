// Create this in a separate file like `axiosConfig.js` or at the top of your main component file
import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
          refresh: refreshToken
        });

        const { access } = response.data;
        localStorage.setItem('token', access);
        
        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
        
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        alert('Session expired. Please log in again.');
        window.location.href = '/login'; // or use your router's navigation
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;