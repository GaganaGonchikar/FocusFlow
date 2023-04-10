import React, { useState } from 'react';

type Event = {
  id: number;
  eventName: string;
  eventDate: string;
  eventLocation: string;
  eventTime: string;
};

type AddEventProps = {
  onAddEvent: (event: Event) => void;
};

const AddEvent: React.FC<AddEventProps> = ({ onAddEvent }) => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventTime, setEventTime] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate input here if needed
    const newEvent: Event = {
      id: Date.now(),
      eventName,
      eventDate,
      eventLocation,
      eventTime,
    };
    onAddEvent(newEvent);
    // Reset form fields
    setEventName('');
    setEventDate('');
    setEventLocation('');
    setEventTime('');
  };

  return (
    <div>
      <h2>Add Event</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Event Name</label>
          <input
            type="text"
            className="form-control"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Event Date</label>
          <input
            type="date"
            className="form-control"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Event Location</label>
          <input
            type="text"
            className="form-control"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Event Time</label>
          <input
            type="time"
            className="form-control"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Event
        </button>
      </form>
    </div>
  )