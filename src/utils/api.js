import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

// Automatically attach JWT token to requests if available
api.interceptors.request.use(
  (config) => {
    // Look inside the browser's localStorage for saved user data
    const user = JSON.parse(localStorage.getItem('userInfo'));
    
    // If a user is logged in and has a JWT token, attach it to the headers
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config; // Continue sending the request
  },
  (error) => Promise.reject(error)
);

export default api;