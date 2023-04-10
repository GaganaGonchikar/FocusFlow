import React from 'react';
import ReactDOM from 'react-dom';
import EventDetails from './components/EventDetails'; // Import the EventDetails component

// Render the EventDetails component in the root div
ReactDOM.render(
  <React.StrictMode>
    <EventDetails />
  </React.StrictMode>,
  document.getElementById('root')
);
