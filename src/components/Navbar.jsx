import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <span className="navbar-brand">Expense~Income~Tracker</span>
    <div className="collapse navbar-collapse">
      <ul className="navbar-nav ml-auto">
       
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/" onClick={() => { /* Add your logout logic here */ }}>Logout</Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;