import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../Style/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">HR Management System</Link>
      <div className="nav-links">
        {!token && <Link to="/login">Login</Link>}
        {token && (
          <>
            {/* <Link to={`/${role.toLowerCase()}`}>Dashboard</Link> */}
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
