import React from 'react';
import logo from './logo.png';
import './NavBar.css';

function NavBar() {
  const handleLoginClick = async () => {
    await fetch('http://localhost:5000/login');    // Handle the response data as needed
  };

  const handleLogoutClick = async () => {
    await fetch('http://localhost:5000/logout');    // Handle the response data as needed
  };

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <img src={logo} alt="Logo" className="navbar__logo" />
      </div>
      <div className="navbar__right">
        <button className="navbar__button" onClick={handleLoginClick}>Login</button>
        <button className="navbar__button" onClick={handleLogoutClick}>Logout</button>
      </div>
    </nav>
  );
}

export default NavBar;
