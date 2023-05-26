import React, { useState } from 'react';
import axios from 'axios';
import './AddEventsForm.css';
// import Header from './../Header';

type EventDetails = {
  event_id: string;
  event_name: string;
  event_location: string;
  event_description: string;
  event_date: string;
};

const AddEventForm: React.FC = () => {
  const [eventDetails, setEventDetails] = useState<EventDetails>({
    event_id: Math.floor(Math.random() * 10000).toString(), // Generate random event_id
    event_name: '',
    event_location: '',
    event_description: '',
    event_date: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setEventDetails((prevEventDetails) => ({
      ...prevEventDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const queryParam = `event_id=${eventDetails.event_id}&event_name=${eventDetails.event_name}&event_location=${eventDetails.event_location}&event_description=${eventDetails.event_description}&event_date=${eventDetails.event_date}`;
      await axios.post(`http://127.0.0.1:8000/add-event/?${queryParam}`);
      setEventDetails({
        event_id: Math.floor(Math.random() * 100000).toString(), // Generate new random event_id
        event_name: '',
        event_location: '',
        event_description: '',
        event_date: '',
      });
      alert('Event added successfully');
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
      {/* <Header title="ADD EVENTS" /> */}
        <label htmlFor="event_id">Event ID:</label>
        <input type="text" id="event_id" name="event_id" value={eventDetails.event_id} onChange={handleInputChange} readOnly />
      </div>
      <div>
        <label htmlFor="event_name">Event Name:</label>
        <input type="text" id="event_name" name="event_name" value={eventDetails.event_name} onChange={handleInputChange} required />
      </div>
      <div>
        <label htmlFor="event_date">Event Date:</label>
        <input type="date" id="event_date" name="event_date" value={eventDetails.event_date} onChange={handleInputChange} required />
      </div>
      <div>
        <label htmlFor="event_location">Event Location:</label>
        <input type="text" id="event_location" name="event_location" value={eventDetails.event_location} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="event_description">Event Description:</label>
        <textarea id="event_description" name="event_description" value={eventDetails.event_description} onChange={handleInputChange} />
      </div>
      
      <button type="submit">Add Event</button>
    </form>
  );
};

export default AddEventForm;
