import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? All your data will be permanently deleted and cannot be recovered.')) {
      authService.deleteUser(localStorage.getItem('userId'))
        .then(() => {
          localStorage.clear();
          navigate('/');
        })
        .catch((error) => {
          console.error('There was an error deleting the account!', error);
        });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <span className="navbar-brand">Expense~Income~Tracker</span>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">Dashboard</Link>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="settingsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Settings
          </a>
          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="settingsDropdown">
            <button className="dropdown-item" onClick={handleDeleteAccount}>Delete Account</button>
            <div className="dropdown-divider"></div>
            <button className="dropdown-item" onClick={handleLogout}>Logout</button>
          </div>
        </li>
      </ul>
      </div>
    </nav>
  );
};

export default Navbar;