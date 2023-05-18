import React from 'react';
import { Switch, Route } from 'wouter';
import EventCalendar from './EventCalendar';
import ParticipationHistory from './ParticipationHistory';
import UpcomingEvents from './UpcomingEvents';
import UserDashboard1 from './UserDashboard1';
import PopularEvents from './popularevents';
import EventList from './eventlist';
// import Feedback from './Feedback';
// import Notifications from './Notifications';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/register" component={UserDashboard1} />
      <Route path="/history">
        <ParticipationHistory />
      </Route>
      <Route path="/upcoming">
        <UpcomingEvents />
      </Route>
      <Route path="/userevent-list">
        <EventList />
      </Route>
      
      {/* <Route path="/feedback">
        <Feedback />
      </Route>
      <Route path="/notifications">
        <Notifications />
      </Route> */}
      <Route path="/event-calendar" component={EventCalendar} />
      <Route path="/popular-events" component={PopularEvents} />
      {/* <Route path="/userevent-list" component={EventList} /> */}
    </Switch>
  );
};

export default Routes;



