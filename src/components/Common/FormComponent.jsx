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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                            <input type="text" name="title" className="form-control" placeholder="Enter title" value={formData.title} onChange={handleChange}  maxlength="10"/>
                        </div>
                        <div className="form-group mb-2">
                            <label>Description</label>
                            <input type="text" name="description" className="form-control" placeholder="Enter description" value={formData.description} onChange={handleChange} />
                        </div>
                        <div className="form-group mb-2">
                            <label>Category</label>
                            <input type="text" name="category" className="form-control" placeholder="Enter category" value={formData.category} onChange={handleChange} />
                        </div>
                        <div className="form-group mb-2">
                            <label>Amount</label>
                            <input type="number" name="amount" className="form-control" placeholder="Enter amount" value={formData.amount} onChange={handleChange} />
                        </div>
                        <div className="form-group mb-2">
                            <label>Date</label>
                            <input type="date" name="date" className="form-control" value={formData.date} onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block mt-3">Add {type}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormComponent;