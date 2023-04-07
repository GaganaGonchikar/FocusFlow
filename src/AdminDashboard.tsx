// import React from 'react';
// import { Link, Route, Switch } from 'wouter';
// import ManageEvents from './ManageEventsScreen';
// import { AddEventForm } from './AddEventsForm';
// import './AdminDashboard.css';
// import focusFlow from "./focuflow.svg";
// import boschlogo from "./boschlogo.png";

// const AdminDashboard: React.FC = () => {
//   return (
//     <div className="admin-dashboard">
//       <div className="logo-container">
//       <img src={boschlogo} alt="Bosch logo" className="logo" />
//       <h1 className="title">ADMIN DASHBOARD</h1>
//       <img src={focusFlow} alt="Focus Flow logo" className="logo1" />
//       </div>
//       <nav>
//         <ul>
//           <li>
//             <Link href="/manage-events" className="nav-link">
//               Manage Events
//             </Link>
//           </li>
//           <li>
//             <Link href="/add-event" className="nav-link">
//               Add Event
//             </Link>
//           </li>
//         </ul>
//       </nav>

//       <Switch>
//         <Route path="/manage-events" component={ManageEvents} />
//         <Route path="/add-event" component={AddEventForm} />
//       </Switch>
//     </div>
//   );
// };

// export default AdminDashboard;


import React from 'react';
import { Link, Route, Switch } from 'wouter';
import ManageEvents from './ManageEventsScreen';
import { AddEventForm } from './AddEventsForm';
import './AdminDashboard.css';
import focusFlow from "./focuflow.svg";
import boschlogo from "./boschlogo.png";

const AdminDashboard: React.FC = () => {
  return (
    <div className="admin-dashboard">
      <div className="logo-container1">
        <img src={boschlogo} alt="Bosch logo" className="logo" />
        <h1 className="title">ADMIN DASHBOARD</h1>
        <img src={focusFlow} alt="Focus Flow logo" className="logo1" />
      </div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link href="/manage-events" className="nav-link">
              Manage Events
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/add-event" className="nav-link">
              Add Event
            </Link>
          </li>
        </ul>
      </nav>

      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <Switch>
              <Route path="/manage-events" component={ManageEvents} />
              <Route path="/add-event" component={AddEventForm} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


// import React, { useState } from 'react';
// import { Link, Route, Switch, useLocation } from 'wouter';
// import ManageEvents from './ManageEventsScreen';
// import { AddEventForm } from './AddEventsForm';
// import './AdminDashboard.css';

// const AdminDashboard: React.FC = () => {
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [location] = useLocation();

//   const toggleSidebar = () => {
//     setShowSidebar(!showSidebar);
//   };

//   return (
//     <div className="admin-dashboard">
//       {/* Header */}
//       <header className="admin-header">
//         {/* Sidebar toggle button */}
//         <button className="sidebar-toggle" onClick={toggleSidebar}>
//           <span className="menu-icon"></span>
//           <span className="menu-icon"></span>
//           <span className="menu-icon"></span>
//         </button>
//         {/* Title */}
//         <h1>ADMIN DASHBOARD</h1>
//       </header>

//       {/* Sidebar */}
//       <nav className={`admin-sidebar ${showSidebar ? 'open' : ''}`}>
//         <div className="admin-sidebar-menu">
//           <ul>
//             {/* Manage Events link */}
//             <li>
//               <Link
//                 href="/manage-events"
//                 className={`nav-link ${
//                   location === '/manage-events' ? 'active' : ''
//                 }`}
//                 onClick={toggleSidebar}
//               >
//                 <span className="link-icon"></span>
//                 <span className="link-text">Manage Events</span>
//               </Link>
//             </li>

//             {/* Add Event link */}
//             <li>
//               <Link
//                 href="/add-event"
//                 className={`nav-link ${
//                   location === '/add-event' ? 'active' : ''
//                 }`}
//                 onClick={toggleSidebar}
//               >
//                 <span className="link-icon"></span>
//                 <span className="link-text">Add Event</span>
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </nav>

//       {/* Main content */}
//       <main className="admin-main-content">
//         <Switch>
//           {/* Manage Events route */}
//           <Route path="/manage-events" component={ManageEvents} />

//           {/* Add Event route */}
//           <Route path="/add-event" component={AddEventForm} />
//         </Switch>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;
