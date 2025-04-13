import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); // redirects to login after logout
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
  <li><Link to="/">Dashboard</Link></li>
  <li><Link to="/emergency/sample-id">Emergency Details</Link></li>
  <li><Link to="/login">Login</Link></li>
  <li><Link to="/register">Register</Link></li>

        <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
