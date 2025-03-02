import React from 'react';
import FormComponent from '../components/Common/FormComponent';
import TableComponent from '../components/Common/TableComponent';
import Navbar from '../components/Navbar';

const ExpensePage = () => (
<>
    <Navbar />
    <div className="container mt-5">
        <div className="row">
            <div className="col-md-6">
                <FormComponent type="Expense" />
            </div>
            <div className="col-md-6">
                <TableComponent type="Expense" />
            </div>
        </div>
    </div>
 </>
);

export default ExpensePage;