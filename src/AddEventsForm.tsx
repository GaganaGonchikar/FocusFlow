// import React from "react";

// import './AddEventsForm.css';
// // import logo from './logo1.svg';
// // import boschlogo from './boschlogo.svg';
// // import people from './people.svg';
// // import border from './border.svg';

// export class AddEventForm extends React.Component <any,any>{
//   handleChange = (event:any) => {
//     event.preventDefault();
//     const { name, value } = event.target;
//     this.setState({ [name]: value });
//     console.log(this.state);
//   };

//   handleSubmit = async (event: any) => {
//     event.preventDefault();
//     // handle form submission here
//     const { eventName, eventDate, eventLocation, eventDescription } = this.state;
  
//     // Generate a unique id
//     // const id = Date.now().toString();

//     const id = Math.floor(Math.random() * 100000 + 1).toString();

  
//     const data = {
//       id,
//       event_name: eventName,
//       event_date: eventDate,
//       event_location: eventLocation,
//       event_description: eventDescription
//     };
  
//     console.log(JSON.stringify(data));
//     try {
//       const response = await fetch('http://127.0.0.1:8000/add-event/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });
  
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
  
//       alert('Event added successfully!');
  
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       alert('Error submitting form');
//     }
//   };
  

//   constructor(props: any) {
//     super(props);
//     this.state = {
//       // id:'',

//       eventName: '',
//       eventDate: '',
//       eventLocation: '',
//       eventDescription: '',
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   render() {
//     return (
//       <div className="wrapper">
//       {/* <img src={logo} alt="Logo" className="logo" />
//       <img src={boschlogo} alt="BoschLogo" className="boschlogo" />
//       <img src={people} alt="People" className="people" />
//       <img src={border} alt="Border" className="border" /> */}


//         <div className="form-wrapper">
//           <h4>ADD EVENT</h4>
//           <form onSubmit={this.handleSubmit} noValidate>
//             <div className="eventName">
//               <label htmlFor="eventName">Event Name  :  </label>
//               <input type="text" name="eventName" onChange={this.handleChange} />
//             </div>
//             <div className="eventDate">
//               <label htmlFor="eventDate">Event Date  :  </label>
//               <input type="date" name="eventDate" onChange={this.handleChange} />
//             </div>
//             <div className="eventLocation">
//               <label htmlFor="eventLocation">Event Location  :  </label>
//               <input type="text" name="eventLocation" onChange={this.handleChange}  />
//             </div>
//             <div className="eventDescription">
//               <label htmlFor="eventDescription">Event Description:</label>
//               <textarea name="eventDescription" onChange={this.handleChange}></textarea>
//             </div>
//             <div className="submit">
//               <button type="submit">Submit</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     );
//   }
// }


import React, { useState } from 'react';

import axios from 'axios';



type EventDetails = {

  event_id: string;

  event_name: string;

  event_location: string;

  event_description: string;

  event_date: string;

};



const AddEventForm: React.FC = () => {

  const [eventDetails, setEventDetails] = useState<EventDetails>({

    event_id: '',

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

        event_id: '',

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

        <input type="text" id="event_date" name="event_date" value={eventDetails.event_date} onChange={handleInputChange} required />

      </div>

      <button type="submit">Add Event</button>

    </form>

  );

};



export default AddEventForm;