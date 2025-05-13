import axios from 'axios';
import { getItem } from './storage';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',  // Base URL for your API
  timeout: 10000,  // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',  // Default content type
    // Add any other default headers here
  },
});

// Add a request interceptor to include token in the header if available in localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getItem('token');  

    if (token) {
      // If token exists, add it to the Authorization header
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
