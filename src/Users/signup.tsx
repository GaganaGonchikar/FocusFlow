// import React, { useState } from 'react';
// import axios from 'axios';
// import './signup.css';

// const SignupForm: React.FC = () => {
//   const [signupDetails, setSignupDetails] = useState({
//     NTID: '',
//     first_name: '',
//     last_name: '',
//     email: '',
//     phone: '',
//     location: '',
//     password: '',
//     approved: false,
//   });

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setSignupDetails((prevSignupDetails) => ({
//       ...prevSignupDetails,
//       [name]: value,
//     }));
//   };


//   const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const { name, value } = event.target;
//     setSignupDetails((prevSignupDetails) => ({
//       ...prevSignupDetails,
//       [name]: value,
//     }));
//   };
  
//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     try {
//       const queryParam = `NTID=${signupDetails.NTID}&first_name=${signupDetails.first_name}&last_name=${signupDetails.last_name}&email=${signupDetails.email}&phone=${signupDetails.phone}&location=${signupDetails.location}&password=${signupDetails.password}&approved=${signupDetails.approved}`;
//       await axios.post(`http://127.0.0.1:8000/signup?${queryParam}`);
//       setSignupDetails({
//         NTID: '',
//         first_name: '',
//         last_name: '',
//         email: '',
//         phone: '',
//         location: '',
//         password: '',
//         approved: false,
//       });
//       alert('Sign up successful');
//     } catch (error) {
//       console.error('Error signing up:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="NTID">NTID:</label>
//         <input type="text" id="NTID" name="NTID" value={signupDetails.NTID} onChange={handleInputChange} required />
//       </div>
//       <div>
//         <label htmlFor="first_name">First Name:</label>
//         <input type="text" id="first_name" name="first_name" value={signupDetails.first_name} onChange={handleInputChange} required />
//       </div>
//       <div>
//         <label htmlFor="last_name">Last Name:</label>
//         <input type="text" id="last_name" name="last_name" value={signupDetails.last_name} onChange={handleInputChange} required />
//       </div>
//       <div>
//         <label htmlFor="email">Email:</label>
//         <input type="email" id="email" name="email" value={signupDetails.email} onChange={handleInputChange} required />
//       </div>
//       <div>
//         <label htmlFor="phone">Phone:</label>
//         <input type="tel" id="phone" name="phone" value={signupDetails.phone} onChange={handleInputChange} required />
//       </div>
      
//       <div>
//         <label htmlFor="location">Location:</label>
//         <select id="location" name="location" value={signupDetails.location} onChange={handleLocationChange} required>
//           <option value="">Select Location</option>
//           <option value="EC">EC-BAN</option>
//           <option value="OMTP">OMTP-BAN</option>
//           <option value="ADU">ADU-BAN</option>
//           <option value="PUNE">PUNE</option>
//           <option value="COIMBATORE">COIMBATORE</option>
//           <option value="...">
//             {/* Add more options as needed */}
//           </option>
//         </select>
//       </div>
//       <div>
//         <label htmlFor="password">Password:</label>
//         <input type="password" id="password" name="password" value={signupDetails.password} onChange={handleInputChange} required />
//       </div>
//       {/* <div>
//         <label htmlFor="approved">Approved:</label>
//         <input type="checkbox" id="approved" name="approved" checked={signupDetails.approved} onChange={handleInputChange} />
//       </div> */}
//       <button type="submit">Sign up</button>
//     </form>

//   );
// };

// export default SignupForm;


import React, { useState } from 'react';
import axios from 'axios';
import { Link, Route, Router } from 'wouter';

import './signup.css';
// import focusFlow from "./focuflow.svg";
// import boschlogo from "./boschlogo.png";

const SignupForm: React.FC = () => {
  const [signupDetails, setSignupDetails] = useState({
    NTID: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    approved: false,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignupDetails((prevSignupDetails) => ({
      ...prevSignupDetails,
      [name]: value,
    }));
  };


  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSignupDetails((prevSignupDetails) => ({
      ...prevSignupDetails,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const queryParam = `NTID=${signupDetails.NTID}&first_name=${signupDetails.first_name}&last_name=${signupDetails.last_name}&email=${signupDetails.email}&phone=${signupDetails.phone}&location=${signupDetails.location}&password=${signupDetails.password}&approved=${signupDetails.approved}`;
      await axios.post(`http://127.0.0.1:8000/signup?${queryParam}`);
      setSignupDetails({
        NTID: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        location: '',
        password: '',
        approved: false,
      });
      alert('Sign up successful');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
        <div className="logo-container">
      {/* <img src={boschlogo} alt="Bosch logo" className="Blogo" /> */}
      <h2 className="title1">SIGN UP</h2>
      {/* <img src={focusFlow} alt="Focus Flow logo" className="Flogo1" /> */}
      </div>
          <div>
            <label htmlFor="NTID">NTID:</label>
            <input type="text" id="NTID" name="NTID" value={signupDetails.NTID} onChange={handleInputChange} required />
          </div>
          <div>
            <label htmlFor="first_name">First Name:</label>
            <input type="text" id="first_name" name="first_name" value={signupDetails.first_name} onChange={handleInputChange} required />
          </div>
          <div>
            <label htmlFor="last_name">Last Name:</label>
            <input type="text" id="last_name" name="last_name" value={signupDetails.last_name} onChange={handleInputChange} required />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={signupDetails.email} onChange={handleInputChange} required />
          </div>
          <div>
            <label htmlFor="phone">Phone:</label>
            <input type="tel" id="phone" name="phone" value={signupDetails.phone} onChange={handleInputChange} required />
          </div>
          <div>
            <label htmlFor="location">Location:</label>
            <select id="location" name="location" value={signupDetails.location} onChange={handleLocationChange} required>
              <option value="">Select Location</option>
              <option value="EC">EC-BAN</option>
              <option value="OMTP">OMTP-BAN</option>
              <option value="ADU">ADU-BAN</option>
            </select>
        </div>
<div>
    <label htmlFor="password">Password:</label>
    <input type="password" id="password" name="password" value={signupDetails.password} onChange={handleInputChange} required />
    </div>
    <div>
    <button type="submit">Sign Up</button>
    <div className="login-link">
  <p>
    Already registered?{' '}
    <Link to="/login">Log in here</Link>
  </p>
</div>

    </div>
    </form>
    </div>
</div>
);
};

export default SignupForm;
