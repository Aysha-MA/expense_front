import axios from 'axios';
import axiosInstance from './axiosInstance';

const API_URL = 'http://localhost:8085/auth/';

const register = async (username, email, password) => {
    try {
        const response = await axios.post(API_URL + 'new', {
            name: username,
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error('There was an error registering!', error);
        throw error;
    }
};

const login = async (username, password) => {
    try {
        const response = await axios.post(API_URL + 'authenticate', {
            username,
            password,
        });
        return response.data;
    } catch (error) {
        console.error('There was an error logging in!', error);
        throw error;
    }
};

export default {
    register,
    login,
};
