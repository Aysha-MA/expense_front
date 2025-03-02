import React from 'react';
import WelcomeNav from '../components/WelcomeNav';

const AboutPage = () => (
  <>
    <WelcomeNav />
    <div className="container mt-5 mb-5">
      <h1 className="text-center mb-4">About Us</h1>
      <div className="card shadow-sm rounded p-4">
        <div className="card-body">
          <p className="lead text-center mb-4">
            Welcome to Expense~Income~Tracker! This application helps you manage your finances by tracking your expenses and incomes. You can view detailed statistics and charts to better understand your financial habits.
          </p>
          <h3 className="mb-3">Features</h3>
          <ul className="list-unstyled mb-4">
            <li className="mb-2"><i className="fas fa-check-circle text-primary"></i> Track your expenses and incomes</li>
            <li className="mb-2"><i className="fas fa-check-circle text-primary"></i> View detailed statistics and charts</li>
            <li className="mb-2"><i className="fas fa-check-circle text-primary"></i> Manage your financial data with ease</li>
            <li className="mb-2"><i className="fas fa-check-circle text-primary"></i> Secure login and registration</li>
          </ul>
         
        </div>
      </div>
    </div>
  </>
);

export default AboutPage;