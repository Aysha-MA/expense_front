import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import expenseService from '../../services/expenseService';
import incomeService from '../../services/incomeService';

const UpdateModal = ({ show, handleClose, type, id, onUpdate }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        amount: '',
        date: '',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const userId = localStorage.getItem('userId');
            let response;
            if (type === 'Expense') {
                response = await expenseService.getExpense(userId, id);
            } else {
                response = await incomeService.getIncome(userId, id);
            }
            setFormData(response.data);
        };
        if (id) {
            fetchData();
        }
    }, [id, type]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' }); // Clear the error message for the field being changed
    };

    const validate = () => {
        const errors = {};
        if (!formData.title) errors.title = 'Title is required';
        if (formData.title.length > 10) errors.title = 'Title cannot exceed 10 characters';
        if (!formData.description) errors.description = 'Description is required';
        if (!formData.category) errors.category = 'Category is required';
        if (!formData.amount) errors.amount = 'Amount is required';
        if (formData.amount <= 0) errors.amount = 'Amount must be greater than zero';
        if (!formData.date) {
            errors.date = 'Date is required';
        } else {
            const year = formData.date.split('-')[0];
            if (year.length !== 4) errors.date = 'Year must be 4 digits';
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
        try {
            if (type === 'Expense') {
                await expenseService.updateExpense(userId, id, formData);
            } else {
                await incomeService.updateIncome(userId, id, formData);
            }
            onUpdate(); // Call the onUpdate function to refresh the data
            handleClose(); // Close the modal
        } catch (error) {
            alert('There was an error updating the form!');
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update {type}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            placeholder="Enter title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                        {errors.title && <small className="text-danger">{errors.title}</small>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            placeholder="Enter description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                        {errors.description && <small className="text-danger">{errors.description}</small>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="text"
                            name="category"
                            placeholder="Enter category"
                            value={formData.category}
                            onChange={handleChange}
                        />
                        {errors.category && <small className="text-danger">{errors.category}</small>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            type="number"
                            name="amount"
                            placeholder="Enter amount"
                            value={formData.amount}
                            onChange={handleChange}
                        />
                        {errors.amount && <small className="text-danger">{errors.amount}</small>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                        />
                        {errors.date && <small className="text-danger">{errors.date}</small>}
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Update {type}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateModal;