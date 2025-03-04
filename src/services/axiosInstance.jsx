import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8085', // Set base API URL
    headers: {
        'Content-Type': 'application/json',
    },
});

let alertShown = false;

const showAlert = (message) => {
    if (!alertShown) {
        alert(message);
        alertShown = true;
        setTimeout(() => {
            alertShown = false;
        }, 500); // Adjust the timeout as needed
    }
};

// Request Interceptor (Attach Token)
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Get token from storage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor (Error Handling)
axiosInstance.interceptors.response.use(
    (response) => response, // If successful, return response
    (error) => {
        if (error.response) {
            if (error.response.status === 403) {
                showAlert('Access forbidden! You do not have permission to access this resource.');
                window.location.href = "/";
            } else if (error.response.status === 500) {
                showAlert('Server error! Please try again later.');
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;