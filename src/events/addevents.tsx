import React, { useState } from "react";
import './events.css';
import logo from './logo1.svg';
import boschlogo from './boschlogo.svg';
import people from './people.svg';
import border from './border.svg';

function AddEventForm() {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventId, setEventId] = useState('');

  const handleChange = (event:any) => {
    event.preventDefault();
    const { name, value } = event.target;
    switch (name) {
      case 'eventName':
        setEventName(value);
        break;
      case 'eventDate':
        setEventDate(value);
        break;
      case 'eventLocation':
        setEventLocation(value);
        break;
      case 'eventDescription':
        setEventDescription(value);
        break;
      default:
        break;
    }
    console.log({eventName, eventDate, eventLocation, eventDescription});
  };

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    // handle form submission here
    const data = {
      event_name: eventName,
      event_date: eventDate,
      event_location: eventLocation,
      event_description: eventDescription
    };
  
    console.log(JSON.stringify(data));
    try {
      const response = await fetch('http://127.0.0.1:8080/add-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const eventData = await response.json();
      setEventId(eventData.event_id);
      alert('Event added successfully!');
  
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    }
  };
  return (
    <div className="wrapper">
      <img src={logo} alt="Logo" className="logo" />
      <img src={boschlogo} alt="BoschLogo" className="boschlogo" />
      <img src={people} alt="People" className="people" />
      <img src={border} alt="Border" className="border" />

      <div className="form-wrapper">
        <h2>Add Event</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="eventId">
            <label>Event ID: </label>
            <span>{eventId}</span>
          </div>

          <div className="eventName">
            <label htmlFor="eventName">Event Name  :  </label>
            <input type="text" name="eventName" onChange={handleChange} />
          </div>
          <div className="eventDate">
            <label htmlFor="eventDate">Event Date  :  </label>
            <input type="date" name="eventDate" onChange={handleChange} />
          </div>
          <div className="eventLocation">
            <label htmlFor="eventLocation">Event Location  :  </label>
            <input type="text" name="eventLocation" onChange={handleChange}  />
          </div>
          <div className="eventDescription">
            <label htmlFor="eventDescription">Event Description:</label>
            <textarea name="eventDescription" onChange={handleChange}></textarea>
          </div>
          <div className="submit">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEventForm;
