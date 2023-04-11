import React from 'react';
import { Link, Route, Switch } from 'wouter';
import UserDetailsTable from './components/UserDetailsTable';
import EventDetailsTable from './components/EventDetailsTable';
import './AdminDashboard.css';
import focusFlow from "./components/focusFlow.png";
import boschlogo from "./components/boschlogo.png";
import EventCalendar from './components/EventCalendar';


const AdminDashboard: React.FC = () => {
  return (
    <div className="admin-dashboard">
      <div className="logo-container1">
        <img src={boschlogo} alt="Bosch logo" className="logo" />
        <h1 className="title">ADMIN DASHBOARD</h1>
        <img src={focusFlow} alt="Focus Flow logo" className="logo1" />
      </div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link href="/manage-events" className="nav-link">
              Manage Events
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/manage-users" className="nav-link">
              Manage Users
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/view-events" className="nav-link">
              View Events
            </Link>
          </li>
        </ul>
      </nav>

      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <Switch>
              <Route path="/manage-events" component={EventDetailsTable} />
              <Route path="/manage-users" component={UserDetailsTable} />
              <Route path="/view-events" component={EventCalendar} />

            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
