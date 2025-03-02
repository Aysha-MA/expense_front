import React from 'react';
import ChartComponent from '../components/Common/ChartComponent';
import Navbar from '../components/Navbar';

const StatsPage = () => {

  const totalIncome = 5000; // Dummy total income
  const totalExpense = 3000; // Dummy total expense
  const balance = totalIncome - totalExpense; // Calculate balance

  return (
    <><Navbar />
    <div className="container">
      <h2>Statistics</h2>
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Total Income</h3>
              <p className="card-text">{totalIncome}</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Total Expense</h3>
              <p className="card-text">{totalExpense}</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Balance</h3>
              <p className="card-text">{balance}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <ChartComponent />
        </div>
      </div>
    </div>
    </>
  );
};

export default StatsPage;