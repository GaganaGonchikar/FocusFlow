import React from 'react';
import { Link } from 'wouter';
import './UserDashboard.css';
import Header from '../Header';

const UserDashboard = () => {
  return (
    <div><Header title="USER DASHBOARD" />
    <div className="dashboard-container">
      <div className="dashboard-tiles-container">
        <Link href="/userevent-list" className="dashboard-tile">
          <h3 className="dashboard-tile-title">Event</h3>
          <p className="dashboard-tile-description">View Event List</p>
        </Link>
        <Link href="/event-calendar" className="dashboard-tile">
          <h3 className="dashboard-tile-title">Event Calendar</h3>
          <p className="dashboard-tile-description">View upcoming events on a calendar</p>
        </Link>
        <Link href="/popular-events" className="dashboard-tile">
          <h3 className="dashboard-tile-title">Popular Events</h3>
          <p className="dashboard-tile-description">View most popular events</p>
        </Link>
      </div>
    </div>
    </div>
  );
};
export default UserDashboard;
