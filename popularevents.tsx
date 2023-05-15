import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './../Header';

interface PopularEvent {
  event_id: string;
  registered_users: number;
}

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
}

const PopularEvents: React.FC = () => {
  const [popularEvents, setPopularEvents] = useState<PopularEvent[]>([]);
  const [eventDetails, setEventDetails] = useState<Record<string, Event>>({});

  useEffect(() => {
    const fetchPopularEvents = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/popular-events/');
        const popularEvents = response.data;
        for (const event of popularEvents) {
          const eventDetailResponse = await axios.get(`http://127.0.0.1:8000/event-details/${event.event_id}`);
          const eventDetail: Event = eventDetailResponse.data;
          setEventDetails((prevEventDetails) => ({
            ...prevEventDetails,
            [event.event_id]: eventDetail,
          }));
        }
        setPopularEvents(popularEvents);
      } catch (error) {
        console.error(error);
      }
    };
    

    fetchPopularEvents();
  }, []);

 


  return (
    <>
      <Header title="POPULAR EVENTS" />
      <ul>
        {popularEvents.map((event) => (
          <li>
            <p>Event ID: {event.event_id}</p>
            <p>Number of Registrations: {event.registered_users}</p>
            {/* display event details if available */}
            {eventDetails[event.event_id] ? (
              <>
                <p>Event Name: {eventDetails[event.event_id].name}</p>
                <p>Event Date: {eventDetails[event.event_id].date}</p>
                <p>Event Location: {eventDetails[event.event_id].location}</p>
                <p>Event Description: {eventDetails[event.event_id].description}</p>
              </>
            ) : (
              <p>Click to load event details</p>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default PopularEvents;
