import React from 'react';
import { Link, Route, Switch } from 'wouter';
import ManageEvents from './ManageEventsScreen';
import { AddEventForm } from './AddEventsForm';
import './AdminDashboard.css';

const AdminDashboard: React.FC = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li>
            <Link href="/manage-events" className="nav-link">
              Manage Events
            </Link>
          </li>
          <li>
            <Link href="/add-event" className="nav-link">
              Add Event
            </Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/manage-events" component={ManageEvents} />
        <Route path="/add-event" component={AddEventForm} />
      </Switch>
    </div>
  );
};

export default AdminDashboard;
