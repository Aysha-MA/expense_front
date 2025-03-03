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

export default {
    getStats,
    getChartData,
};