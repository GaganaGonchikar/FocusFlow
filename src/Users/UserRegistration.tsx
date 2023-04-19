
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataGrid, { Column, Paging } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

type EventDetails = {
  event_id: string;
  event_name: string;
  event_location: string;
  event_description: string;
  event_date: string;
  is_registered: boolean; // Add is_registered field
};

const UserRegistration: React.FC = () => {
  const [eventDetails, setEventDetails] = useState<EventDetails[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [ntid, setNtid] = useState('');

  useEffect(() => {
    axios.get<EventDetails[]>('http://127.0.0.1:8000/event-data/').then((response) => {
      setEventDetails(response.data);
    });
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const searchEvent = (event: EventDetails, query: string) => {
    return (
      // event.event_id.toLowerCase().includes(query.toLowerCase()) ||
      event.event_name.toLowerCase().includes(query.toLowerCase()) ||
      event.event_location.toLowerCase().includes(query.toLowerCase()) ||
      event.event_description.toLowerCase().includes(query.toLowerCase()) ||
      event.event_date.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredEventDetails = eventDetails.filter((event) => searchEvent(event, searchQuery));

  const handleRegister = async (event: EventDetails) => {
    try {
      // Check if user is already registered
      if (event.is_registered) {
        alert('You are already registered for this event');
        return;
      }
  
      // Make a POST request to register the user for the event with NTID
      await axios.post(`http://127.0.0.1:8000/register-event/${event.event_id}`,   { NTID: ntid } );
  
      // Update the eventDetails state to reflect the registration status
      setEventDetails((prevEventDetails) =>
        prevEventDetails.map((prevEvent) => {
          if (prevEvent.event_id === event.event_id) {
            return { ...prevEvent, is_registered: true };
          }
          return prevEvent;
        })
      );
  
      alert('Registered successfully'); // Show success message
    } catch (error) {
      console.error('Failed to register for event:', error);
      alert('Failed to register for event'); // Show error message
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
        className="search-input"
      />
      <input
        type="text"
        placeholder="Enter NTID..."
        value={ntid}
        onChange={(event) => setNtid(event.target.value)}
        className="ntid-input"
      />
      <DataGrid dataSource={filteredEventDetails} showBorders={true}>
        <Column dataField="event_id" caption="Event ID" />
        <Column dataField="event_name" caption="Event Name" />
        <Column dataField="event_location" caption="Event Location" />
        <Column dataField="event_description" caption="Event Description" />
        <Column dataField="event_date" caption="Event Date" />
        <Column
          caption="Register"
          cellRender={(row) => (
            <button
              onClick={() => handleRegister(row.data)}
              disabled={row.data.is_registered}
              className="register-button"
            >
              {
                row.data.is_registered ? 'Registered' : 'Register'
              }
                </button>
              )}
            />
            <Paging defaultPageSize={10} />
          </DataGrid>
        </div>
        );
      };
      export default UserRegistration;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// // Define interfaces for user and event data
// interface User {
//   NTID: string;
//   // Add other user properties here
// }

// interface Event {
//   event_id: string;
//   // Add other event properties here
// }

// const RegisterEvent: React.FC = () => {
//   const [NTID, setNTID] = useState('');
//   const [events, setEvents] = useState<Event[]>([]);

//   // Fetch events data on component mount
//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/event-data/'); // Change the API endpoint to match your backend API
//       const data = response.data;
//       setEvents(data);
//     } catch (error) {
//       console.error('Failed to fetch events:', error);
//     }
//   };

//   const handleRegister = async (event_id: string) => {
//     try {
//       const response = await axios.post(`http://127.0.0.1:8000/register-event/${event_id}`, { NTID }, { headers: { 'Content-Type': 'application/json' } }); // Change the API endpoint to match your backend API
//       const data = response.data;
//       console.log(data);
//     } catch (error) {
//       console.error('Failed to register:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Register for Events</h1>
//       <div>
//         <label htmlFor="ntid">NTID:</label>
//         <input type="text" id="ntid" value={NTID} onChange={(e) => setNTID(e.target.value)} />
//       </div>
//       <h2>Events:</h2>
//       <ul>
//         {events.map((event) => (
//           <li key={event.event_id}>
//             {event.event_id}
//             <button className="register-button" onClick={() => handleRegister(event.event_id)}>Register</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default RegisterEvent;





// import React, { Component } from 'react';
// import axios from 'axios';

// // Define interfaces for user and event data
// interface User {
//   NTID: string;
//   // Add other user properties here
// }

// interface Event {
//   event_id: string;
//   // Add other event properties here
// }

// class RegisterEvent extends Component<{}, { NTID: string; events: Event[] }> {
//   constructor(props: {}) {
//     super(props);
//     this.state = {
//       NTID: '',
//       events: [],
//     };
//   }

//   componentDidMount() {
//     this.fetchEvents();
//   }

//   fetchEvents = async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/event-data/'); // Change the API endpoint to match your backend API
//       const data = response.data;
//       this.setState({ events: data });
//     } catch (error) {
//       console.error('Failed to fetch events:', error);
//     }
//   };

//   handleRegister = async (event_id: string) => {
//     const { NTID } = this.state;
//     if (!NTID) {
//       console.error('NTID is required.');
//       return;
//     }

//     try {
//       const response = await axios.post(`http://127.0.0.1:8000/register-event/${event_id}`, { NTID }); // Change the API endpoint to match your backend API
//       const data = response.data;
//       console.log(data);
//     } catch (error) {
//       console.error('Failed to register:', error);
//     }
//   };

//   render() {
//     const { NTID, events } = this.state;

//     return (
//       <div>
//         <h1>Register for Events</h1>
//         <div>
//           <label>NTID:</label>
//           <input type="text" value={NTID} onChange={(e) => this.setState({ NTID: e.target.value })} />
//         </div>
//         <h2>Events:</h2>
//         <ul>
//           {events.map((event) => (
//             <li key={event.event_id}>
//               {event.event_id}
//               <button onClick={() => this.handleRegister(event.event_id)}>Register</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }

// export default RegisterEvent;
