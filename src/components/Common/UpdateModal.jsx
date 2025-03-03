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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                        <Form.Control type="text" name="title" placeholder="Enter title" value={formData.title} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="description" placeholder="Enter description" value={formData.description} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" name="category" placeholder="Enter category" value={formData.category} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="number" name="amount" placeholder="Enter amount" value={formData.amount} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} />
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