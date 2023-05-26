import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import Header from './../Header';
import './popularevents.css';


interface Event {
  event_id: number;
  registered_users: number;
  event_name: string;
  event_date: string;
  event_location: string;
  event_description: string;
}

const PopularEvents: React.FC = () => {
  const [popularEvents, setPopularEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchPopularEvents();
  }, []);

  const fetchPopularEvents = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/popular-events/');
      if (!response.ok) {
        throw new Error('Failed to fetch popular events');
      }
      const data = await response.json();
      setPopularEvents(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* <Header title="POPULAR EVENTS" /> */}
      <div className="table-container">
        <table className="event-table">
          <thead>
            <tr>
              <th>Event ID</th>
              {/* <th>Event Name</th>
              <th>Date</th>
              <th>Location</th>
              <th>Description</th> */}
              <th>Registered Users</th>
            </tr>
          </thead>
          <tbody>
            {popularEvents.map((event) => (
              <tr key={event.event_id}>
                <td>{event.event_id}</td>
                {/* <td>{event.event_name}</td>
                <td>{event.event_date}</td>
                <td>{event.event_location}</td>
                <td>{event.event_description}</td> */}
                <td>{event.registered_users}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PopularEvents;