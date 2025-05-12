import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',  // Base URL for your API
});

// Add a request interceptor to include token in the header if available in localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    // const token = localStorage.getItem('token');  

    // if (token) {
    //   // If token exists, add it to the Authorization header
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
