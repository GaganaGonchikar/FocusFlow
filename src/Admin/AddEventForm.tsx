import React, { useState } from 'react';
import axios from 'axios';
import './AddEventForm.css';

type EventDetails = {
  event_id: string;
  event_name: string;
  event_location: string;
  event_description: string;
  event_date: string;
  type_of_event: string;
};

const AddEventForm: React.FC = () => {
  const [eventDetails, setEventDetails] = useState<EventDetails>({
    event_id: '',
    event_name: '',
    event_location: '',
    event_description: '',
    event_date: '',
    type_of_event: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setEventDetails((prevEventDetails) => ({
      ...prevEventDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const queryParam = `event_id=${eventDetails.event_id}&event_name=${eventDetails.event_name}&event_location=${eventDetails.event_location}&event_description=${eventDetails.event_description}&event_date=${eventDetails.event_date}&type_of_event=${eventDetails.type_of_event}`;
      await axios.post(`http://127.0.0.1:8000/add-event/?${queryParam}`);
      setEventDetails({
        event_id: '',
        event_name: '',
        event_location: '',
        event_description: '',
        event_date: '',
        type_of_event: '',
      });
      alert('Event added successfully');
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="event_id">Event ID:</label>
          <input type="text" id="event_id" name="event_id" value={eventDetails.event_id} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="event_name">Event Name:</label>
          <input type="text" id="event_name" name="event_name" value={eventDetails.event_name} onChange={handleInputChange} required />
        </div>
        <div>
          <label htmlFor="event_location">Event Location:</label>
          <input type="text" id="event_location" name="event_location" value={eventDetails.event_location} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="event_description">Event Description:</label>
          <textarea id="event_description" name="event_description" value={eventDetails.event_description} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="event_date">Event Date:</label>
          <input type="date" id="event_date" name="event_date" value={eventDetails.event_date} onChange={handleInputChange} required />
        </div>
        <div>
          <label htmlFor="type_of_event">Type of Event:</label>
          <select id="type_of_event" name="type_of_event" value={eventDetails.type_of_event} onChange={handleInputChange}>
            <option value="">Select type of event</option>
            <option value="music">Music</option>
            <option value="sport">Sport</option>
            <option value="campus connect">Campus Connect</option>
          </select>
        </div>
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};


export default AddEventForm;

