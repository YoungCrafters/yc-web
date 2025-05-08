import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Base API configurations
const apiConfig: AxiosRequestConfig = {
    baseURL: process.env.BASE_URL || 'http://localhost:8000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
};

// Create axios instance
const api: AxiosInstance = axios.create(apiConfig);

// Add request interceptors
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        // Add authentication token if available
        const token = localStorage.getItem('access');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
    (error: AxiosError): Promise<AxiosError> => {
        return Promise.reject(error);
    }
);

// Add response interceptors
api.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        return response;
    },
    (error: AxiosError): Promise<AxiosError> => {
        // Handle common errors here (401, 403, etc)
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access (redirect to login, etc.)
        }
        return Promise.reject(error);
    }
);

export default api