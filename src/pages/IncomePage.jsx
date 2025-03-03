import React, { useState, useEffect } from 'react';
import incomeService from '../services/incomeService';
import FormComponent from '../components/Common/FormComponent';
import TableComponent from '../components/Common/TableComponent';
import Navbar from '../components/Navbar';

const IncomePage = () => {
    const [incomes, setIncomes] = useState([]);

    const fetchIncomes = async () => {
        const userId = localStorage.getItem('userId');
        const response = await incomeService.getAllIncomes(userId);
        setIncomes(response.data);
    };

    useEffect(() => {
        fetchIncomes();
    }, []);

    const handleUpdate = (id) => {
        // Implement update logic here
    };

    const handleDelete = () => {
        fetchIncomes();
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="text-center mb-4">Manage Incomes</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <FormComponent type="Income" onAdd={fetchIncomes} />
                    </div>
                    <div className="col-md-6">
                        <TableComponent type="Income" data={incomes} onUpdate={handleUpdate} onDelete={handleDelete} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default IncomePage;