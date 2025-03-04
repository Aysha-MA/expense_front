import React, { useState } from 'react';
import expenseService from '../../services/expenseService';
import incomeService from '../../services/incomeService';
import UpdateModal from './UpdateModal';

const TableComponent = ({ type, data, onDelete }) => {
    const [showModal, setShowModal] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const handleDelete = async (id) => {
        const userId = localStorage.getItem('userId');
        const confirmDelete = window.confirm('Are you sure you want to delete this item?');
        if (confirmDelete) {
            try {
                if (type === 'Expense') {
                    await expenseService.deleteExpense(userId, id);
                } else {
                    await incomeService.deleteIncome(userId, id);
                }
                onDelete(); // Call the onDelete function to refresh the table data
            } catch (error) {
                alert('There was an error deleting the item!');
            }
        }
    };

    const handleUpdate = (id) => {
        setCurrentId(id);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setCurrentId(null);
    };

    return (
        <div className="container">
            <h2>{type}s</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.title}</td>
                            <td className="table-description">{item.description}</td>
                            <td>{item.category}</td>
                            <td>{item.amount}</td>
                            <td>{item.date}</td>
                            <td>
                                <div className="d-flex">
                                    <button className="btn btn-primary btn-sm mr-2" onClick={() => handleUpdate(item.id)}>Update</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <UpdateModal show={showModal} handleClose={handleClose} type={type} id={currentId} onUpdate={onDelete} />
        </div>
    );
};

export default TableComponent;