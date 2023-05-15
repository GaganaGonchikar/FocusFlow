import React from 'react';
import { Link, Route, Switch } from 'wouter';
import './AdminDashboard.css'
import Header from './../Header';
import Navigation from './navigation';

const AdminDashboard = () => {
  return (
    <div className="root">
       <Header title="ADMIN DASHBOARD" />
       <Navigation /> 
    </div>
  );
};

export default AdminDashboard;