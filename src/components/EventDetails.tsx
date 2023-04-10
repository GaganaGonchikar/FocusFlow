import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Event = {
  event_id: string;
  event_name: string;
  event_location: string;
  event_description: string;
  event_date: string;
};

const EventDetails = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    axios
      .get('http://localhost:8000/event-data/')
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEventHover = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleEventLeave = () => {
    setSelectedEvent(null);
  };

  return (
    <div>
      <h1>Event Details</h1>
      <table>
        <thead>
          <tr>
            <th>Event ID</th>
            <th>Event Name</th>
            <th>Event Location</th>
            <th>Event Description</th>
            <th>Event Date</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr
              key={event.event_id}
              onMouseEnter={() => handleEventHover(event)}
              onMouseLeave={handleEventLeave}
            >
              <td>{event.event_id}</td>
              <td>{event.event_name}</td>
              <td>{event.event_location}</td>
              <td>{event.event_description}</td>
              <td>{event.event_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedEvent && (
        <div className="event-details-dropdown">
          <h2>Event Details</h2>
          <p>
            <strong>Event ID:</strong> {selectedEvent.event_id}
          </p>
          <p>
            <strong>Event Name:</strong> {selectedEvent.event_name}
          </p>
          <p>
            <strong>Event Location:</strong> {selectedEvent.event_location}
          </p>
          <p>
            <strong>Event Description:</strong> {selectedEvent.event_description}
          </p>
          <p>
            <strong>Event Date:</strong> {selectedEvent.event_date}
          </p>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
