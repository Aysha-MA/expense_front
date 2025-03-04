import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);
  return(
  <div className="container text-center my-5">
    <div className="jumbotron bg-light p-5 shadow-lg">
      <h1 className="display-4">Welcome to Expense Income Tracker</h1>
      <p className="lead">Manage your expenses and incomes efficiently.</p>
      <hr className="my-4" />
      <p>Get started by signing up or logging in.</p>
      <Link to="/signup" className="btn btn-primary btn-lg m-2">Signup</Link>
      <Link to="/login" className="btn btn-secondary btn-lg m-2">Login</Link>
    </div>
  </div>
);
};

export default Welcome;