import React from 'react';
import { Link } from 'wouter';
import './navigation.css';

const Navigation = () => {
  return (
    <nav className="nav">
      <Link to="/manage-events" className="navLink">
        Manage Events
      </Link>
      <Link to="/add-events" className="navLink">
        Add Event
      </Link>
      <Link to="/manage-users" className="navLink">
        Manage Users
      </Link>
      <Link to="/excel-upload" className="navLink">
        Upload Events
      </Link>
    </nav>
  );
};

export default Navigation;
