import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

// Esto asegura que el "pase" (token) vaya en cada mensaje al backend
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;