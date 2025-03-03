import axiosInstance from './axiosInstance';

const addExpense = (expense) => {
    return axiosInstance.post('/expense/add', expense);
};

const getAllExpenses = (userId) => {
    return axiosInstance.get(`/expense/getAll/${userId}`);
};

const updateExpense = (userId, id, expense) => {
    return axiosInstance.put(`/expense/update/${userId}/${id}`, expense);
};

const deleteExpense = (userId, id) => {
    return axiosInstance.delete(`/expense/delete/${userId}/${id}`);
};

const getTotalExpenses = (userId) => {
    return axiosInstance.get(`/expense/get/total/${userId}`);
};

const getExpensesByDateRange = (userId, startDate, endDate) => {
    return axiosInstance.get(`/expense/get/daterange`, {
        params: {
            userId,
            startDate,
            endDate,
        },
    });
};

const getExpense = (userId, id) => {
    return axiosInstance.get(`/expense/get/${userId}/${id}`);
};

export default {
    addExpense,
    getAllExpenses,
    updateExpense,
    deleteExpense,
    getTotalExpenses,
    getExpensesByDateRange,
    getExpense,
};