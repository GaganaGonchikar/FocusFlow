import * as React from "react";
import axios from "axios";
import { RouteComponentProps } from "wouter";
import { Calendar, momentLocalizer, DateLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./EventCalendar.css";

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

  handleCloseModal = () => {
    this.setState({ selectedEvent: null });
  };

  handleRegister = () => {
    const { selectedEvent } = this.state;
    const ntid = prompt("Enter NTID:");
    if (selectedEvent && ntid) {
      const url = `http://127.0.0.1:8000/register-event?event_id=${selectedEvent.event_id}&NTID=${ntid}`;
      axios
        .post(url)
        .then((response) => {
          alert(response.data.message);
        })
        .catch((error) => {
          alert(error.response.data.detail);
        });
    }
  };
  
  
  render() {
    const { events, selectedEvent } = this.state;

    return (
      <div className="event-calendar">
        <h1>Event Calendar</h1>
        <Calendar
          localizer={localizer}
          events={events.map((event) => ({
            ...event,
            start: moment(event.event_date).toDate(),
            end: moment(event.event_date).toDate(),
            title: event.event_name,
          }))}
          onSelectEvent={this.handleSelectEvent}
          selectable
          views={["month", "agenda"]}
          timeslots={4}
          className="rbc-calendar"
        />

        {selectedEvent && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h2>{selectedEvent.event_name}</h2>
                <button className="close" onClick={this.handleCloseModal}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <p>Date: {selectedEvent.event_date}</p>
                <p>Location: {selectedEvent.event_location}</p>
                <p>Description: {selectedEvent.event_description}</p>
                <p>Event Id: {selectedEvent.event_id}</p>
                <button onClick={this.handleRegister}>Register</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default EventCalendar;
