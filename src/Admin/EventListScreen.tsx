import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createProxyMiddleware } from 'http-proxy-middleware';
import './styleUserEventList.css';

type Events = {
  event_name: string;
  event_date: string;
  event_location: string;
  event_description: string;
  event_id: string;
  
};


const EventListTable = () => {
  const [eventDetails, setEventDetails] = useState<Events[]>([]);

  useEffect(() => {
    axios.get<Events[]>('http://127.0.0.1:8000/').then((response) => {
      setEventDetails(response.data);
    });
  }, []);

  return (
    <div>
       <header className="header">
      <h1>Event List Screen</h1>
    </header>
    <table>
      <thead>
        {/* <tr> */}
          <th>Event Name</th>
          <th>Event Date</th>
          <th>Event Location</th>
          <th>Event Description</th>
          <th>Event ID</th>
        {/* </tr> */}
      </thead>
      <tbody>
        {eventDetails.map((eventDetail) => (
          // <tr key={userDetail.nt_Id}>
          <tr>
            <td>{eventDetail.event_name}</td>
            <td>{eventDetail.event_date}</td>
            <td>{eventDetail.event_location}</td>
            <td>{eventDetail.event_description}</td>
            <td>{eventDetail.event_id}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default EventListTable;