import React from 'react';
import { Link, Route, Switch } from 'wouter';
import logo from "./focusFlow.png";
import './AdminDashboard.css'

const AdminDashboard = () => {
  return (
    <div className="root">
      <header className="header">
        <img src={logo} alt="Logo" className="logo2" /> 
        <h1 className="title">ADMIN DASHBOARD</h1>
      </header>
      
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
        {/* <Link to="/excel-upload" className="navLink">
          Upload Events
        </Link> */}
      </nav>

      
    </div>
  );
};

export default AdminDashboard;