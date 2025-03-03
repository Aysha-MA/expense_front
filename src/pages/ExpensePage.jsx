import React, { useState, useEffect } from 'react';
import expenseService from '../services/expenseService';
import FormComponent from '../components/Common/FormComponent';
import TableComponent from '../components/Common/TableComponent';
import Navbar from '../components/Navbar';

const ExpensePage = () => {
    const [expenses, setExpenses] = useState([]);

    const fetchExpenses = async () => {
        const userId = localStorage.getItem('userId');
        const response = await expenseService.getAllExpenses(userId);
        setExpenses(response.data);
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleUpdate = (id) => {
        // Implement update logic here
    };

    const handleDelete = () => {
        fetchExpenses();
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="text-center mb-4">Manage Expenses</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <FormComponent type="Expense" onAdd={fetchExpenses} />
                    </div>
                    <div className="col-md-6">
                        <TableComponent type="Expense" data={expenses} onUpdate={handleUpdate} onDelete={handleDelete} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ExpensePage;