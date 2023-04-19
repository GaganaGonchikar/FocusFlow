
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

import React from 'react';
import { Route, Link } from 'wouter';
// import AdminDashboard from './AdminDashboard';
import LoginForm from './Users/loginform';
import SignUpForm from './Users/signup'; // Assuming you have a SignUpForm component for the sign up page
 // Assuming you have a LoginForm component for the login page
 const App: React.FC = () => {
  return (
    <div className="App">
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
      <Route path="/login" component={LoginForm} /> {/* Add this line for the Sign up route */}
    </div>
  );
};

export default App;
