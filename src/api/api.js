import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import {API_BASE_URL} from '@env';

// const API_BASE_URL = 'http://ip-address:8000/api';

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
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
      console.log('No internet connection.');
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
            status: status,
          });

        case 401:
          console.log('auth: ', 'Unauthorized. Please log in again.');
          return Promise.reject({
            type: 'auth',
            message: 'Unauthorized. Please log in again.',
            status: status,
          });

        case 403:
          console.log('forbidden: ', 'Access denied.');
          return Promise.reject({
            type: 'forbidden',
            message: 'Access denied.',
            status: status,
          });

        case 404:
          console.log('not_found: ', 'Resource not found.');
          return Promise.reject({
            type: 'not_found',
            message: 'Resource not found.',
            status: status,
          });

        case 422:
          return Promise.reject({
            type: 'validation',
            message: data.message,
            errors: data.errors,
            status: status,
          });

        case 429:
          console.log('rate_limit: ', 'Too many requests. Try later.');
          return Promise.reject({
            type: 'rate_limit',
            message: 'Too many requests. Try later.',
            status: status,
          });

        case 500:
          console.log('server: ', 'Internal server error');
          return Promise.reject({
            type: 'server',
            message: 'Internal server error. Please try again later.',
            status: status,
          });

        default:
          console.log('unknown', data.message);
          return Promise.reject({
            type: 'unknown',
            message: data.message || 'An unknown error occurred.',
            status: status,
          });
      }
    }

    // if (error.message?.includes('Network Error') || !error.response) {
    //   return Promise.reject({
    //     type: 'network',
    //     message: 'No internet connection.',
    //   });
    // }

    if (error.message?.includes('Network Error') || !error.response) {
      console.log('Network Error:', error.message);
      // return Promise.reject({
      //   type: 'network',
      //   message: 'No internet connection.',
      // });
    }

    if (error.code === 'ECONNABORTED') {
      console.log('ECONNABORTED: timeout');
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
