import axiosInstance from './axiosInstance';

const API_URL = '/auth/';

const register = async (username, email, password) => {
    try {
        const response = await axiosInstance.post(API_URL + 'new', {
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
        const response = await axiosInstance.post(API_URL + 'authenticate', {
            username,
            password,
        });
        return response.data;
    } catch (error) {
        console.error('There was an error logging in!', error);
        throw error;
    }
};
const deleteUser = (userId) => {
    return axiosInstance.delete(API_URL +`delete/${userId}`);
};

export default {
    register,
    login,
    deleteUser,
};