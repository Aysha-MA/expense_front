import React, { useState } from 'react';
import expenseService from '../../services/expenseService';
import incomeService from '../../services/incomeService';

const FormComponent = ({ type, onAdd }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        amount: '',
        date: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const errors = {};
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        if (!formData.title) errors.title = 'Title is required';
        if (formData.title.length > 10) errors.title = 'Title cannot exceed 10 characters';
        // if (!formData.description) errors.description = 'Description is required';
        if (formData.description.length > 50) errors.description = 'Description cannot exceed 50 characters';
        if (!formData.category) errors.category = 'Category is required';
        if (!formData.amount) errors.amount = 'Amount is required';
        if (formData.amount <= 0) errors.amount = 'Amount must be greater than zero';
        if (!formData.date) {
            errors.date = 'Date is required';
        } else {
            const year = formData.date.split('-')[0];
            if (year.length !== 4) errors.date = 'Year must be 4 digits';
            if (formData.date > today) errors.date = 'Date cannot be in the future';
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        const userId = localStorage.getItem('userId');
        const data = { ...formData, userId };
        try {
            if (type === 'Expense') {
                await expenseService.addExpense(data);
            } else {
                await incomeService.addIncome(data);
            }
            onAdd(); // Call the onAdd function to refresh the table data
            setFormData({
                title: '',
                description: '',
                category: '',
                amount: '',
                date: '',
            });
            setErrors({});
        } catch (error) {
            alert('There was an error submitting the form!');
        }
    };

    return (
        <div className="container mt-4 mb-5">
            <div className="card shadow">
                <div className="card-body">
                    <h2 className="card-title text-center mb-3">Add {type}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-2">
                            <label>Title</label>
                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                placeholder="Enter title"
                                value={formData.title}
                                onChange={handleChange}
                                maxLength="10"
                            />
                            {errors.title && <small className="text-danger">{errors.title}</small>}
                        </div>
                        <div className="form-group mb-2">
                            <label>Description</label>
                            <input
                                type="text"
                                name="description"
                                className="form-control"
                                placeholder="Enter description"
                                value={formData.description}
                                onChange={handleChange}
                                maxLength="50"
                            />
                            {errors.description && <small className="text-danger">{errors.description}</small>}
                        </div>
                        <div className="form-group mb-2">
                            <label>Category</label>
                            <input
                                type="text"
                                name="category"
                                className="form-control"
                                placeholder="Enter category"
                                value={formData.category}
                                onChange={handleChange}
                            />
                            {errors.category && <small className="text-danger">{errors.category}</small>}
                        </div>
                        <div className="form-group mb-2">
                            <label>Amount</label>
                            <input
                                type="number"
                                name="amount"
                                className="form-control"
                                placeholder="Enter amount"
                                value={formData.amount}
                                onChange={handleChange}
                            />
                            {errors.amount && <small className="text-danger">{errors.amount}</small>}
                        </div>
                        <div className="form-group mb-2">
                            <label>Date</label>
                            <input
                                type="date"
                                name="date"
                                className="form-control"
                                value={formData.date}
                                onChange={handleChange}
                            />
                            {errors.date && <small className="text-danger">{errors.date}</small>}
                        </div>
                        <button type="submit" className="btn btn-primary btn-block mt-3">Add {type}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormComponent;