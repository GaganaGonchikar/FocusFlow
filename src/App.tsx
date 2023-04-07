// import React from 'react';
// // import UserListScreen from './UserListScreen';
// // import EventListScreen from './EventListScreen'
// // import ManageEventsScreen from './ManageEventsScreen'

// import ManageEventsScreen from './ManageEventsScreen'
// const App: React.FC = () => {
//   return (
//     <div className="App">
//       {/* <UserListScreen /> */}
//       <ManageEventsScreen/>
//       {/* <EventListScreen/> */}
//     </div>
//   );
// };

// export default App;

// import React from 'react';

// import './App.css';

// import { AddEventForm } from './AddEventsForm';

// function App() {

// return (

//  <AddEventForm/>

// );

// }

// export default App;



import React from 'react';
// import UserListScreen from './UserListScreen';
// import EventListScreen from './EventListScreen'
// import ManageEventsScreen from './ManageEventsScreen'

import AdminDashboard from './AdminDashboard'
const App: React.FC = () => {
  return (
    <div className="App">
      {/* <UserListScreen /> */}
      <AdminDashboard/>
      {/* <EventListScreen/> */}
    </div>
  );
};

export default App;