import react from 'react'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import NavBar from './components/NavBar'
import { EventProvider } from './EventContext'
import EventsTable from './components/EventsTable'
import AddEvents from './components/AddEventts'
import UpdateEvent from './components/UpdateEvent'
import { UpdateEventContextProvider } from './UpdateEventContext'
import { AdminContextProvider } from './AdminContext'
import AdminPage from './components/AdminPage'

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <EventProvider>
            <NavBar />
            <div className="row">
              <div className="col-sm-10 col-xm-12 mr-auto ml-auto mt-4 mb-4">
                <UpdateEventContextProvider>
                <AdminContextProvider>
                    <Route exact path='/' component={EventsTable} />
                    <Route exact path='/updateevent' component={UpdateEvent} />
                    <Route exact path="/adminpage" component={AdminPage} />
                    <Route exact path="/addevent" component={AddEvents} />
                </AdminContextProvider>
                </UpdateEventContextProvider>
              
              </div>
            </div>
          </EventProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;