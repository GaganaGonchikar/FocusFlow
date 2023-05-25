// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { createProxyMiddleware } from 'http-proxy-middleware';
// import './styleUserList.css';

// type Users = {
//   NTID: string;
//   FirstName: string;
//   LastName: string;
//   Email: string;
//   Phone: string;
//   Location: string;
// };


// const UserDetailsTable = () => {
//   const [userDetails, setUserDetails] = useState<Users[]>([]);

//   useEffect(() => {
//     axios.get<Users[]>('http://127.0.0.1:8000/').then((response) => {
//       setUserDetails(response.data);
//     });
//   }, []);

//   return (
//     <div>
//        <header className="header">
//       <h1>User List Screen</h1>
//     </header>
//     <table>
//       <thead>
//         <tr>
//           <th>NTID</th>
//           <th>First Name</th>
//           <th>Last Name</th>
//           <th>Email</th>
//           <th>Phone</th>
//           <th>Location</th>
//         </tr>
//       </thead>
//       <tbody>
//         {userDetails.map((userDetail) => (
//           <tr key={userDetail.NTID}>
//             <td>{userDetail.NTID}</td>
//             <td>{userDetail.FirstName}</td>
//             <td>{userDetail.LastName}</td>
//             <td>{userDetail.Email}</td>
//             <td>{userDetail.Phone}</td>
//             <td>{userDetail.Location}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//     </div>
//   );
// };

// export default UserDetailsTable;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createProxyMiddleware } from 'http-proxy-middleware';
import './styleUserEventList.css';

type Users = {
  first_name: string;
  last_name: string;
  dob: string;
  nt_Id: string;
  employee_Id: string;
  email: string;
  password: string;
};


const UserDetailsTable = () => {
  const [userDetails, setUserDetails] = useState<Users[]>([]);

  useEffect(() => {
    axios.get<Users[]>('http://127.0.0.1:8000/').then((response) => {
      setUserDetails(response.data);
    });
  }, []);

  return (
    <div>
       <header className="header">
      <h1>User List Screen</h1>
    </header>
    <table>
      <thead>
        {/* <tr> */}
          <th>First Name</th>
          <th>Last Name</th>
          <th>DOB</th>
          <th>NTID</th>
          <th>Employee ID</th>
          <th>E-Mail</th>
          <th>Password</th>
        {/* </tr> */}
      </thead>
      <tbody>
        {userDetails.map((userDetail) => (
          // <tr key={userDetail.nt_Id}>
          <tr>
            <td>{userDetail.first_name}</td>
            <td>{userDetail.last_name}</td>
            <td>{userDetail.dob}</td>
            <td>{userDetail.nt_Id}</td>
            <td>{userDetail.employee_Id}</td>
            <td>{userDetail.email}</td>
            <td>{userDetail.password}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default UserDetailsTable;


