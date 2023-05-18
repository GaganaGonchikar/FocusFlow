
// import React from 'react';
// import AdminDashboard from './AdminDashboard'
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

import React, { useState } from 'react';
import Sidebar from './Users/SideBar';
import Routes from './Users/UserDashboard';
import LoginForm from './Users/loginform';
import SignUpForm from './Users/signup';
import { Route, Link } from 'wouter';

const App: React.FC = () => {
  const [activeItem, setActiveItem] = useState('register');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div>
      {loggedIn ? (
        <>
          <Sidebar activeItem={activeItem} onItemClick={handleItemClick} />
          <div className="main-content">
            <Routes />
          </div>
        </>
      ) : (
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
      )}
    </div>
  );
};

export default App;



// import React, { useState } from 'react';
// import Sidebar from './Users/SideBar';
// import Routes from './Users/UserDashboard';
// import LoginForm from './Users/loginform';
// import SignUpForm from './Users/signup';
// import { Switch, Route, Link } from 'wouter';

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
//       <Switch>
//         <Route path="/" component={SignUpForm} />
//         <Route path="/login">
//           <LoginForm onLogin={handleLogin} />
//         </Route>
//         <Route path="/dashboard">
//           {loggedIn ? (
//             <>
//               <Sidebar activeItem={activeItem} onItemClick={handleItemClick} />
//               <div className="main-content">
//                 <Routes />
//               </div>
//             </>
//           ) : (
//             <LoginForm onLogin={handleLogin} />
//           )}
//         </Route>
//       </Switch>
//     </div>
//   );
// };

// export default App;


