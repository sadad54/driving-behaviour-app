import axios from 'axios';

const API_BASE_URL = 'https://your-backend-api.com/api';
//replace later with actual backend URL

export const api= axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

//optional interceprtor for logging/debugging
api.interceptors.request.use((config) => {
  console.log('API Request:', config.method, config.url, config.data);
  return config;
});