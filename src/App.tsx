
// import React from 'react';
// import AdminDashboard from './Admin/AdminDashboard';
// const App: React.FC = () => {
//   return (
//     <div className="App">
//       <AdminDashboard/>
//     </div>
//   );
// };

// export default App;

// import React from 'react';
// import UserRegistration from './Users/UserRegistration'
// const App: React.FC = () => {
//   return (
//     <div className="App">
//       <UserRegistration/>
//     </div>
//   );
// };

// export default App;


// export default App;

// import React from 'react';
// import Signup from './Users/signup'
// const App: React.FC = () => {
//   return (
//     <div className="App">
//       <Signup/>
//     </div>
//   );
// };

// export default App;



// import React from 'react';
// import Login from './Users/loginform'
// const App: React.FC = () => {
//   return (
//     <div className="App">
//       <Login/>
//     </div>
//   );
// };

// export default App;





// import React from 'react';
// import { Router, Route } from 'wouter';

// import Login  from './Users/loginform';

// import  SignUp  from './Users/signup';
// const App: React.FC = () => {
//    return (

//  <div className="App">

//  <Router>

//  <Route path="/login" component={Login} />
//  <Route path="/signup" component={SignUp} />

//  </Router>

// </div>

// );
// };

// export default App;


// import React from 'react';
// import { Route, Link } from 'wouter';
// import LoginForm from './Users/loginform';
// import SignUpForm from './Users/signup'; 
//  const App: React.FC = () => {
//   return (
//     <div className="App">
//       <nav>
//         <ul>
          
//           <li>
//             <Link to="/signup">Sign up</Link>
//           </li>
//           <li>
//             <Link to="/login">Login</Link>
//           </li>
//         </ul>
//       </nav>
      
//       <Route path="/signup" component={SignUpForm} />
//       <Route path="/login" component={LoginForm} /> {/* Add this line for the Sign up route */}
//     </div>
//   );
// };

// export default App;



// import React from 'react';
// import ParticipationHistory from './Users/ParticipationHistory'
// const App: React.FC = () => {
//   return (
//     <div className="App">
//       <ParticipationHistory/>
//     </div>
//   );
// };

// export default App;


// import React from 'react';
// import UpcomingEvents from './Users/UpcomingEvents'
// const App: React.FC = () => {
//   return (
//     <div className="App">
//       <UpcomingEvents/>
//     </div>
//   );
// };

// export default App;


// import React from 'react';
// import { Route, Link } from 'wouter';
// import ParticipationHistory from './Users/ParticipationHistory';
// import UpcomingEvents from './Users/UpcomingEvents';

// const App: React.FC = () => {
//   return (
//     <div className="App">
//       <nav>
//         <ul>
//           <li><Link to="/participation">Participation History</Link></li>
//           <li><Link to="/events">Upcoming Events</Link></li>
//         </ul>
//       </nav>
//       <Route path="/participation">
//         <ParticipationHistory />
//       </Route>
//       <Route path="/events">
//         <UpcomingEvents />
//       </Route>
//     </div>
//   );
// };

// export default App;

// import React, { useState } from 'react';
// import Sidebar from './Users/SideBar';

// class App extends React.Component {
//   state = {
//     activeItem: 'register',
//   };

//   handleItemClick = (item: string) => {
//     this.setState({ activeItem: item });
//     // Handle item click logic here
//   };

//   render() {
//     const { activeItem } = this.state;

//     return (
//       <div>
//         <Sidebar activeItem={activeItem} onItemClick={this.handleItemClick} />
//         {/* Rest of your application */}
//       </div>
//     );
//   }
// }

// export default App;

// import React, { useState } from 'react';
// import Sidebar from './Users/SideBar';
// import Routes from './Users/UserDashboard';
// // import './Users/SideBar.css';

// const App: React.FC = () => {
//   const [activeItem, setActiveItem] = useState('register');

//   const handleItemClick = (item: string) => {
//     setActiveItem(item);
//   };

//   return (
//     <div>
//       <Sidebar activeItem={activeItem} onItemClick={handleItemClick} />
//       <div className="main-content">
//         <Routes />
//       </div>
//     </div>
//   );
// };

// export default App;

// import React, { useState } from 'react';
// import Sidebar from './Users/SideBar';
// import Routes from './Users/UserDashboard';
// import LoginForm from './Users/loginform';
// import SignUpForm from './Users/signup';
// import { Route, Link } from 'wouter';

// const App: React.FC = () => {
//   const [activeItem, setActiveItem] = useState('register');
//   const [loggedIn, setLoggedIn] = useState(false);

//   const handleItemClick = (item: string) => {
//     setActiveItem(item);
//   };

//   const handleLogin = () => {
//     setLoggedIn(true);
//   };

//   const handleLogout = () => {
//     setLoggedIn(false);
//   };

//   return (
//     <div>
//       {loggedIn ? (
//         <>
//           <Sidebar activeItem={activeItem} onItemClick={handleItemClick} />
//           <div className="main-content">
//             <Routes />
//           </div>
//         </>
//       ) : (
//         <div>
//           <nav>
//             <ul>
//               <li>
//                 <Link to="/signup">Sign up</Link>
//               </li>
//               <li>
//                 <Link to="/login">Login</Link>
//               </li>
//             </ul>
//           </nav>

//           <Route path="/signup" component={SignUpForm} />
//           <Route path="/login">
//             <LoginForm onLogin={handleLogin} />
//           </Route>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;


// import React from 'react';
// import Questionnaire from './Users/Preference';
// // import './components/preference.css'

// const App: React.FC = () => {
//   const handleQuestionnaireFinished = (answers: string[]) => {
//     console.log('Questionnaire finished! Answers:', answers);
//   };

//   return (
//     <div>
     
//       <Questionnaire onFinished={handleQuestionnaireFinished} />
//     </div>
//   );
// };

// export default App;



// import React, { useState } from 'react';
// import Sidebar from './Users/SideBar';
// import Routes from './Users/UserDashboard';
// import LoginForm from './Users/loginform';
// import SignUpForm from './Users/signup';
// import { Route, Link } from 'wouter';
// import Questionnaire from './Users/Preference';

// const App: React.FC = () => {
//   const [activeItem, setActiveItem] = useState('register');
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false);

//   const handleItemClick = (item: string) => {
//     setActiveItem(item);
//   };

//   const handleLogin = () => {
//     setLoggedIn(true);
//   };

//   const handleLogout = () => {
//     setLoggedIn(false);
//   };

//   const handleQuestionnaireFinished = (answers: string[]) => {
//     console.log('Questionnaire finished! Answers:', answers);
//     setQuestionnaireCompleted(true);
//   };

//   return (
//     <div>
//       {!loggedIn ? (
//         <div>
//           <nav>
//             <ul>
//               <li>
//                 <Link to="/signup">Sign up</Link>
//               </li>
//               <li>
//                 <Link to="/login">Login</Link>
//               </li>
//             </ul>
//           </nav>

//           <Route path="/signup" component={SignUpForm} />
//           <Route path="/login">
//             <LoginForm onLogin={handleLogin} />
//           </Route>
//         </div>
//       ) : questionnaireCompleted ? (
//         <>
//           <Sidebar activeItem={activeItem} onItemClick={handleItemClick} />
//           <div className="main-content">
//             <Routes />
//           </div>
//         </>
//       ) : (
//         <Questionnaire onFinished={handleQuestionnaireFinished} />
//       )}
//     </div>
//   );
// };

// export default App;


// import React from 'react';
// import StartingPage from './StartingPage'
// const App: React.FC = () => {
//   return (
//     <div className="App">
//       <StartingPage/>
//     </div>
//   );
// };

// export default App;



// import React from 'react';
// import { Link, Route, Switch } from 'wouter';
// // import EventCalendar from './Users/EventCalendar';
// // import UserDashboard from './Users/UserDashboard';
// import StartingPage from './StartingPage';
// import AdminDashboard from './Admin/AdminDashboard';
// import AddEventForm from './Admin/AddEventsForm';
// import EventDetailsTable from './Admin/ManageEventsScreen';
// import UserDetailsTable from './Admin/ManageUserScreen';
// // import PopularEvents from './Users/popularevents';
// // import eventlist from './Users/eventlist';
// import ImportEventData from'./Admin/UploadExcel';


// const App = () => {
//   return (
//     <Switch>
//       <Route path="/" component={StartingPage} /> 
//       {/* <Route path="/user-login" component={UserDashboard} />
//       <Route path="/event-calendar" component={EventCalendar} /> */}
//       <Route path="/admin-login" component={AdminDashboard} />
//       <Route path="/manage-events" component={EventDetailsTable}/>
//       <Route path="/manage-users" component={UserDetailsTable} />
//       <Route path="/add-event" component={AddEventForm} />
//       {/* <Route path="/popular-events" component={PopularEvents} />
//       <Route path="/userevent-list" component={eventlist} /> */}
//       <Route path="/upload-excel" component={ImportEventData} />
//     </Switch>
//   );
// };

// export default App;



import React, { useState } from 'react';
import { Link, Route, Switch } from 'wouter';
import Sidebar from './Users/SideBar';
import Routes from './Users/UserDashboard';
import LoginForm from './Users/loginform';
import SignUpForm from './Users/signup';
import Questionnaire from './Users/Preference';
import StartingPage from './StartingPage';
import AdminDashboard from './Admin/AdminDashboard';
import AddEventForm from './Admin/AddEventsForm';
import EventDetailsTable from './Admin/ManageEventsScreen';
import UserDetailsTable from './Admin/ManageUserScreen';
import ImportEventData from './Admin/UploadExcel';

const App: React.FC = () => {
  const [activeItem, setActiveItem] = useState('register');
  const [loggedIn, setLoggedIn] = useState(false);
  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false);

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleQuestionnaireFinished = (answers: string[]) => {
    console.log('Questionnaire finished! Answers:', answers);
    setQuestionnaireCompleted(true);
  };

  return (
    <div>
      <Switch>
        <Route path="/" component={StartingPage} />

        <Route path="/admin-login" component={AdminDashboard} />
        <Route path="/manage-events" component={EventDetailsTable} />
        <Route path="/manage-users" component={UserDetailsTable} />
        <Route path="/add-event" component={AddEventForm} />
        <Route path="/upload-excel" component={ImportEventData} />

        <Route path="/user">
          <UserApp />
        </Route>

        <Route>
          {!loggedIn ? (
            <div>
              <nav>
                <ul>
                  <li>
                    <Link to="/signup">Sign up</Link>
                  </li>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                </ul>
              </nav>

              <Route path="/signup" component={SignUpForm} />
              <Route path="/login">
                <LoginForm onLogin={handleLogin} />
              </Route>
            </div>
          ) : questionnaireCompleted ? (
            <>
              <Sidebar activeItem={activeItem} onItemClick={handleItemClick} />
              <div className="main-content">
                <Routes />
              </div>
            </>
          ) : (
            <Questionnaire onFinished={handleQuestionnaireFinished} />
          )}
        </Route>
      </Switch>
    </div>
  );
};

const UserApp = () => {
  // Define your UserApp component logic here
  return <div>User App</div>;
};

export default App;




// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './Users/Feedback.css';
// import { BrowserRouter, Routes, Route, Form } from "react-router-dom";
// import React from 'react';
// import StickyHeader from './Users/headers';
// import FeedbackForm from './Users/Feedback';
// // import Submissions from './Users/FeedbackSubmission';

// function App(): JSX.Element {
//   return (
//     <div className="App">
//       <StickyHeader />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<FeedbackForm />}/>
//           {/* <Route path="submissions" element={<Submissions />} />
//           <Route path="submission/:id" element={<Submissions />} /> */}
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
