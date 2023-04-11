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
//       <div className="logo-container1">
//         <img src={boschlogo} alt="Bosch logo" className="logo" />
//         <h1 className="title">ADMIN DASHBOARD</h1>
//         <img src={focusFlow} alt="Focus Flow logo" className="logo1" />
//       </div>
//       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//         <ul className="navbar-nav mr-auto">
//           <li className="nav-item">
//             <Link href="/manage-events" className="nav-link">
//               Manage Events
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link href="/add-event" className="nav-link">
//               Add Event
//             </Link>
//           </li>
//         </ul>
//       </nav>

//       <div className="container-fluid">
//         <div className="row justify-content-center">
//           <div className="col-md-8">
//             <Switch>
//               <Route path="/manage-events" component={ManageEvents} />
//               <Route path="/add-event" component={AddEventForm} />
//             </Switch>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


import React from 'react';
import { Link, Route, Switch } from 'wouter';
import ManageEvents from './ManageEventsScreen';
import ManageUsers from './ManageUserScreen';
import  AddEventForm  from './AddEventsForm';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import focusFlow from "./focuflow.svg";
import boschlogo from "./boschlogo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
    marginLeft: theme.spacing(2),
  },
  logo: {
    width: '80px',
    marginRight: theme.spacing(2),
  },
  logo1: {
    width: '120px',
  },
  navbar: {
    backgroundColor: 'rgb(145, 108, 212)',
  },
  navLink: {
    color: '#FFFFFF',
    textDecoration: 'none',
  },
  activeNavLink: {
    fontWeight: 'bold',
  },
}));

const AdminDashboard: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <img src={boschlogo} alt="Bosch logo" className={classes.logo} />
          <Typography variant="h5" className={classes.title}>
            ADMIN DASHBOARD
          </Typography>
          <img src={focusFlow} alt="Focus Flow logo" className={classes.logo1} />
        </Toolbar>
      </AppBar>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar style={{ justifyContent: 'center' }}>
          <Button component={Link} to="/manage-events" className={classes.navLink} activeClassName={classes.activeNavLink}>
            Manage Events
          </Button>
          <Button component={Link} to="/add-event" className={classes.navLink} activeClassName={classes.activeNavLink}>
            Add Event
          </Button>
          <Button component={Link} to="/manage-users" className={classes.navLink} activeClassName={classes.activeNavLink}>
            Manage Users
          </Button>
        </Toolbar>
      </AppBar>

      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <Switch>
              <Route path="/manage-events" component={ManageEvents} />
              <Route path="/add-event" component={AddEventForm} />
              <Route path="/manage-users" component={ManageUsers} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;





// import React, { useState } from 'react';
// import { Link, Route, Switch } from 'wouter';
// import ManageEvents from './ManageEventsScreen';
// import { AddEventForm } from './AddEventsForm';
// import focusFlow from './focuflow.svg';
// import boschlogo from './boschlogo.png';
// import {
//   AppBar,
//   Drawer,
//   IconButton,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Toolbar,
//   Typography,
// } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import { Menu as MenuIcon, EventNote as EventNoteIcon, AddCircle as AddCircleIcon } from '@material-ui/icons';

// const drawerWidth = 240;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//   },
//   appBar: {
//     zIndex: theme.zIndex.drawer + 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//     [theme.breakpoints.up('md')]: {
//       display: 'none',
//     },
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//   },
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   toolbar: theme.mixins.toolbar,
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//   },
//   logoContainer: {
//     display: 'flex',
//     alignItems: 'center',
//     padding: theme.spacing(2),
//     marginBottom: theme.spacing(2),
//   },
//   logo: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//     textAlign: 'center',
//   },
// }));

// const AdminDashboard: React.FC = () => {
//   const classes = useStyles();
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const drawer = (
//     <div>
//       <div className={classes.toolbar} />
//       <List>
//         <ListItem button component={Link} href="/manage-events">
//           <ListItemIcon>
//             <EventNoteIcon />
//           </ListItemIcon>
//           <ListItemText primary="Manage Events" />
//         </ListItem>
//         <ListItem button component={Link} href="/add-event">
//           <ListItemIcon>
//             <AddCircleIcon />
//           </ListItemIcon>
//           <ListItemText primary="Add Event" />
//         </ListItem>
//       </List>
//     </div>
//   );

//   return (
//     <div className={classes.root}>
//       <AppBar position="fixed" className={classes.appBar}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             className={classes.menuButton}
//           >
//             <MenuIcon />
//           </IconButton>
//           <div className={classes.logoContainer}>
//             <img src={boschlogo} alt="Bosch logo" className={classes.logo} />
//             <Typography variant="h6" className={classes.title}>
//               ADMIN DASHBOARD
//             </Typography>
//             <img src={focusFlow} alt="Focus Flow logo" className={classes.logo} />
//           </div>
//         </Toolbar>
//       </AppBar>
//       <nav className={classes.drawer} aria-label="mailbox folders">
//         <Drawer
//           variant="temporary"
//           anchor="left"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           classes={{
//             paper: classes.drawerPaper,
//           }}
//           ModalProps={{
//             keepMounted: true,
//           }}
//           >
//             {drawer}
//           </Drawer>
//         </nav>
//         <main className={classes.content}>
//           <div className={classes.toolbar} />
//           <Switch>
//             <Route path="/manage-events" component={ManageEvents} />
//             <Route path="/add-event" component={AddEventForm} />
//           </Switch>
//         </main>
//         </div>
//   );
// };
        
