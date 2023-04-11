import * as React from "react";
import axios from "axios";
import { RouteComponentProps } from "wouter";
import { Calendar, momentLocalizer, DateLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import './EventCalender.css';

interface EventDetails {
  event_id: string;
  event_name: string;
  event_location: string;
  event_description: string;
  event_date: string;
}

interface EventCalendarProps extends RouteComponentProps {}

interface EventCalendarState {
  events: EventDetails[];
  selectedDate: Date | null;
  selectedEvent: EventDetails | null;
}

const localizer: DateLocalizer = momentLocalizer(moment);

class EventCalendar extends React.Component<
  EventCalendarProps,
  EventCalendarState
> {
  constructor(props: EventCalendarProps) {
    super(props);

    this.state = {
      events: [],
      selectedDate: null,
      selectedEvent: null,
    };
  }

  componentDidMount() {
    axios
      .get<EventDetails[]>("http://127.0.0.1:8000/event-data")
      .then((response) => {
        console.log(response.data); // log response data
        this.setState({ events: response.data });
      });
  }

  handleSelectEvent = (event: EventDetails) => {
    this.setState({ selectedEvent: event });
  };

  handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    this.setState({ selectedDate: slotInfo.start });
  };

  render() {
    const { events, selectedDate, selectedEvent } = this.state;
    console.log(events); // log events
    console.log(selectedDate); // log selectedDate

    return (
      <div>
        <h1>Event Calendar</h1>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="event_date"
          endAccessor="event_date"
          onSelectEvent={this.handleSelectEvent}
          onSelectSlot={this.handleSelectSlot}
          selectable
          views={['month', 'week']} // show only month and week views
        />
        {selectedEvent && (
          <div>
            <h2>{selectedEvent.event_name}</h2>
            <p>Date: {selectedEvent.event_date}</p>
            <p>Location: {selectedEvent.event_location}</p>
            <p>Description: {selectedEvent.event_description}</p>
          </div>
        )}
        {selectedDate && (
          <div>
            <h2>Events on {selectedDate.toDateString()}</h2>
            {events
              .filter(
                (event) =>
                  moment(event.event_date).isSame(selectedDate, "day")
              )
              .map((event) => (
                <div key={event.event_id}>
                  <h3>{event.event_name}</h3>
                  <p>Location: {event.event_location}</p>
                  <p>Description: {event.event_description}</p>
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }
}

export default EventCalendar;
