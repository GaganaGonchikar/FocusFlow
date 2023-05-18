// import React, { useState } from 'react';
// import axios from 'axios';
// import './loginform.css';
// // import boschlogo from "./boschlogo.png";

// interface LoginDetails {
//   username: string;
//   password: string;
// }


// const LoginForm: React.FC = () => {
//   const [loginDetails, setLoginDetails] = useState<LoginDetails>({
//     username: '',
//     password: '',
//   });

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setLoginDetails((prevLoginDetails) => ({
//       ...prevLoginDetails,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     try {
//       const queryParams = `username=${loginDetails.username}&password=${loginDetails.password}`;
//       await axios.post(`http://127.0.0.1:8000/login?${queryParams}`);
//       setLoginDetails({
//         username: '',
//         password: '',
//       });
//       alert('Logged in successfully');
      
//     } catch (error) {
//       console.error('Error logging in:', error);
//     }
//   };

//   return (
//     <div className="wrapper1">
//       <div className="form-wrapper1">
//         <form onSubmit={handleSubmit}>
//           <div className="logo-container">
//             {/* <img src={boschlogo} alt="Bosch logo" className="Blogo" /> */}
//             <h2 className="title1">LOG IN</h2>
//           </div>
//           <div>
//             <label htmlFor="username">Username:</label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={loginDetails.username}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="password">Password:</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={loginDetails.password}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div>
//             <button type="submit">Log In</button>
//             <div className="signup-link">
//               <p>
//                 Not registered yet? <a href="/signup">Sign up here</a>
//               </p>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;




import React, { useState } from 'react';
import axios from 'axios';
import './loginform.css';

interface LoginFormProps {
  onLogin: () => void;
}

interface LoginDetails {
  username: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [loginDetails, setLoginDetails] = useState<LoginDetails>({
    username: '',
    password: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginDetails((prevLoginDetails) => ({
      ...prevLoginDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const queryParams = `username=${loginDetails.username}&password=${loginDetails.password}`;
      await axios.post(`http://127.0.0.1:8000/login?${queryParams}`);
      setLoginDetails({
        username: '',
        password: '',
      });
      onLogin(); // Call the onLogin callback when login is successful
      alert('Logged in successfully');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
        <div className="wrapper1">
          <div className="form-wrapper1">
            <form onSubmit={handleSubmit}>
              <div className="logo-container">
                {/* <img src={boschlogo} alt="Bosch logo" className="Blogo" /> */}
                <h2 className="title1">LOG IN</h2>
              </div>
              <div>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={loginDetails.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={loginDetails.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <button type="submit">Log In</button>
                <div className="signup-link">
                  <p>
                    Not registered yet? <a href="/signup">Sign up here</a>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
};

export default LoginForm;
