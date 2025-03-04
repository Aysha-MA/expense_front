import axiosInstance from './axiosInstance';

const getStats = (userId) => {
    return axiosInstance.get(`/statistics/stats`, {
        params: { userId },
    });
};

const getChartData = (userId) => {
    return axiosInstance.get(`/statistics/chartdata`, {
        params: { userId },
    });
};
const getDashboard = () => {
    return axiosInstance.get(`/statistics/dashboard`);
};

export default {
    getStats,
    getChartData,
    getDashboard,
};