import React from "react";
import "../stylesheets/Navbar.css"; // import your navbar styles
import logo from "../logo.png";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
      <img src={logo} alt="Logo" />
      </div>
      <div className="navbar-search">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="navbar-login">
        <button
          onClick={() => (window.location.href = "http://localhost:5000/login")}
        >
          Login
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
