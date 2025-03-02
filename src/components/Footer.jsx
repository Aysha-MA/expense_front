import React from "react";
import '../index.css';

const Footer = () => {
  return (
    <footer className="footer text-center py-3 bg-light">
      <p className="mb-0">
        &copy; {new Date().getFullYear()} Expense Income Tracker. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;