import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import {BASE_URL} from '../config/app';


// const BASE_URL = 'http://ip-address:8000/api';

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Function to check internet before requests
const isInternetAvailable = async () => {
  const netInfo = await NetInfo.fetch();
  return netInfo.isConnected;
};

// Request Interceptor (Check Internet & Attach Token)
axiosInstance.interceptors.request.use(
  async config => {
    const isConnected = await isInternetAvailable();

    if (!isConnected) {
      return Promise.reject({
        type: 'network',
        message: 'No internet connection. Please check your network.',
      });
    }

    // Attach token if needed (example)
    // const token = await AsyncStorage.getItem('authToken');
    const token = null; // Replace with actual token retrieval logic
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

// Response Interceptor (Handle Errors)
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const {status, data} = error.response;

      switch (status) {
        case 400:
          return Promise.reject({
            type: 'bad_request',
            message: data.message || 'Bad Request.',
          });

        case 401:
          return Promise.reject({
            type: 'auth',
            message: 'Unauthorized. Please log in again.',
          });

        case 403:
          return Promise.reject({type: 'forbidden', message: 'Access denied.'});

        case 404:
          return Promise.reject({
            type: 'not_found',
            message: 'Resource not found.',
          });

        case 422:
          return Promise.reject({
            type: 'validation',
            message: data.message,
            errors: data.errors,
          });

        case 429:
          return Promise.reject({
            type: 'rate_limit',
            message: 'Too many requests. Try later.',
          });

        case 500:
          return Promise.reject({
            type: 'server',
            message: 'Internal server error. Please try again later.',
          });

        default:
          return Promise.reject({
            type: 'unknown',
            message: data.message || 'An unknown error occurred.',
          });
      }
    }

    if (error.message.includes('Network Error') || !error.response) {
      return Promise.reject({
        type: 'network',
        message: 'No internet connection.',
      });
    }

    if (error.code === 'ECONNABORTED') {
      return Promise.reject({
        type: 'timeout',
        message: 'Request timeout. Try again later.',
      });
    }

    return Promise.reject({
      type: 'unknown',
      message: error.message || 'An unknown error occurred.',
    });
  },
);

export default axiosInstance;
