


// import React, { useState } from 'react';
// import { Link } from 'wouter';
// import './SideBar.css';
// import boschengage from './BOSCHEngage.png'; // Replace with the path to your logo image

// type SidebarProps = {
//   activeItem: string;
//   onItemClick: (item: string) => void;
// };

// const Sidebar: React.FC<SidebarProps> = ({ activeItem, onItemClick }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const closeSidebar = () => {
//     setIsSidebarOpen(false);
//   };

//   const sidebarItems = [
//     { id: 'register', label: 'Register for Events', path: '/register' },
//     { id: 'history', label: 'Participation History', path: '/history' },
//     { id: 'upcoming', label: 'Upcoming Events', path: '/upcoming' },
//     { id: 'feedback', label: 'Feedback', path: '/feedback' },
//     { id: 'signout', label: 'Logout', path: '/signout' },
//   ];

//   return (
//     <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
//       <div className="sidebar-header">
//         <div className={`toggle-button ${isSidebarOpen ? '' : 'collapsed'}`} onClick={toggleSidebar}>
//           <div className="line" />
//           <div className="line" />
//           <div className="line" />
//         </div>
//         <div className="sidebar-logo">
//           <img src={boschengage} alt="Logo" className="logo-image" />
//         </div>
//       </div>
//       <div className="sidebar-items" onClick={closeSidebar}>
//         {sidebarItems.map((item) => (
//           <Link key={item.id} to={item.path} onClick={() => onItemClick(item.id)}>
//             <div className={`sidebar-item ${item.id === activeItem ? 'active' : ''}`}>
//               {item.label}
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import './SideBar.css';
import boschengage from './BOSCHEngage.png'; // Replace with the path to your logo image

type SidebarProps = {
  activeItem: string;
  onItemClick: (item: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ activeItem, onItemClick }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [location, setLocation] = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const sidebarItems = [
    { id: 'register', label: 'Register for Events', path: '/register' },
    { id: 'history', label: 'Participation History', path: '/history' },
    { id: 'upcoming', label: 'Upcoming Events', path: '/upcoming' },
    { id: 'feedback', label: 'Feedback', path: '/feedback' },
    { id: 'signout', label: 'Logout', path: '/signout' },
  ];

  useEffect(() => {
    if (location === '/signout') {
      window.location.href = 'http://localhost:3000/';
    }
  }, [location]);

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className={`toggle-button ${isSidebarOpen ? '' : 'collapsed'}`} onClick={toggleSidebar}>
          <div className="line" />
          <div className="line" />
          <div className="line" />
        </div>
        <div className="sidebar-logo">
          <img src={boschengage} alt="Logo" className="logo-image" />
        </div>
      </div>
      <div className="sidebar-items" onClick={closeSidebar}>
        {sidebarItems.map((item) => (
          <Link key={item.id} to={item.path} onClick={() => onItemClick(item.id)}>
            <div className={`sidebar-item ${item.id === activeItem ? 'active' : ''}`}>
              {item.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
