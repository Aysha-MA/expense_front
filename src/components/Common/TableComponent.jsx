import React from 'react';

const TableComponent = ({ type }) => (
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
                {/* Dummy data */}
                <tr>
                    <td>Sample Title</td>
                    <td>Sample Description</td>
                    <td>Sample Category</td>
                    <td>100</td>
                    <td>2025-02-24</td>
                    <td>
                        <div className="d-flex">
                            <button className="btn btn-primary btn-sm mr-2">Update</button>
                            <button className="btn btn-danger btn-sm">Delete</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
);

export default TableComponent;