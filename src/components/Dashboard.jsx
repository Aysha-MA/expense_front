import React from 'react';
import { Link } from 'react-router-dom';
import { FaMoneyBillWave, FaChartLine, FaWallet } from 'react-icons/fa';
import '../index.css'; // Ensure you import the CSS file

const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return 'Good Morning';
  } else if (currentHour < 18) {
    return 'Good Afternoon';
  } else {
    return 'Good Evening';
  }
};

const Dashboard = () => {
  const username = localStorage.getItem('username');

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">{`${getGreeting()}, ${username}!`}</h1>
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <FaWallet size={40} className="mb-3" />
              <h5 className="card-title">Manage Expenses</h5>
              <Link to="/expenses" className="btn btn-primary">Go to Expenses</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <FaMoneyBillWave size={40} className="mb-3" />
              <h5 className="card-title">Manage Incomes</h5>
              <Link to="/incomes" className="btn btn-primary">Go to Incomes</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <FaChartLine size={40} className="mb-3" />
              <h5 className="card-title">View Statistics</h5>
              <Link to="/stats" className="btn btn-primary">Go to Statistics</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;