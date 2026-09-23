import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar container">
      <div className="navbar-left">
        <a href="#" className="nav-link">Shop</a>
        <a href="#" className="nav-link">About</a>
      </div>
      
      <div className="navbar-center">
        <h1 className="logo">HAWTEA</h1>
      </div>
      
      <div className="navbar-right">
        <a href="#" className="nav-link">Cart (0)</a>
        <button className="menu-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
