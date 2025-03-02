import React from 'react';

const FormComponent = ({ type }) => (
    <div className="container mt-4 mb-5"> 
        <div className="card shadow"> 
            <div className="card-body">
                <h2 className="card-title text-center mb-3">Add {type}</h2>
                <form>
                    <div className="form-group mb-2">
                        <label>Title</label>
                        <input type="text" className="form-control" placeholder="Enter title" />
                    </div>
                    <div className="form-group mb-2">
                        <label>Description</label>
                        <input type="text" className="form-control" placeholder="Enter description" />
                    </div>
                    <div className="form-group mb-2">
                        <label>Category</label>
                        <input type="text" className="form-control" placeholder="Enter category" />
                    </div>
                    <div className="form-group mb-2">
                        <label>Amount</label>
                        <input type="number" className="form-control" placeholder="Enter amount" />
                    </div>
                    <div className="form-group mb-2">
                        <label>Date</label>
                        <input type="date" className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mt-3">Add {type}</button>
                </form>
            </div>
        </div>
    </div>
);

export default FormComponent;