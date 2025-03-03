import axiosInstance from './axiosInstance';

const addIncome = (income) => {
    return axiosInstance.post('/income/add', income);
};

const getAllIncomes = (userId) => {
    return axiosInstance.get(`/income/getAll/${userId}`);
};

const updateIncome = (userId, id, income) => {
    return axiosInstance.put(`/income/update/${userId}/${id}`, income);
};

const deleteIncome = (userId, id) => {
    return axiosInstance.delete(`/income/delete/${userId}/${id}`);
};

const getTotalIncome = (userId) => {
    return axiosInstance.get(`/income/get/total/${userId}`);
};

const getIncomesByDateRange = (userId, startDate, endDate) => {
    return axiosInstance.get(`/income/get/daterange`, {
        params: {
            userId,
            startDate,
            endDate,
        },
    });
};

const getIncome = (userId, id) => {
    return axiosInstance.get(`/income/get/${userId}/${id}`);
};

export default {
    addIncome,
    getAllIncomes,
    updateIncome,
    deleteIncome,
    getTotalIncome,
    getIncomesByDateRange,
    getIncome,
};
