import React from 'react';
import { Link, Route, Switch } from 'wouter';
import EventCalendar from './User/EventCalendar';
import UserDashboard from './UserDashboard';
import StartingPage from './StartingPage';
import AdminDashboard from './Admin/AdminDashboard';
import AddEventForm from './Admin/AddEventForm';
import EventDetailsTable from './Admin/EventDetailsTable';
import UserDetailsTable from './Admin/UserDetailsTable';
import PopularEvents from './User/popularevents';
import eventlist from './User/eventlist';
// import excelupload from'./Admin/excelupload';

const App = () => {
  return (
    <Switch>
      <Route path="/" component={StartingPage} /> 
      <Route path="/user-login" component={UserDashboard} />
      <Route path="/event-calendar" component={EventCalendar} />
      <Route path="/admin-login" component={AdminDashboard} />
      <Route path="/manage-events" component={EventDetailsTable}/>
      <Route path="/manage-users" component={UserDetailsTable} />
      <Route path="/add-events" component={AddEventForm} />
      <Route path="/popular-events" component={PopularEvents} />
      <Route path="/userevent-list" component={eventlist} />
      {/* <Route path="/excel-upload" component={excelupload} /> */}
    </Switch>
  );
};

export default App;