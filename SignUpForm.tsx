import React from "react";
import './style.css';

export class SignUp extends React.Component <any,any>{
  handleChange = (event:any) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(this.state);
  };

  handleSubmit = async (event:any) => {
    event.preventDefault();
    // handle form submission here
    const { firstName, lastName, NTID, email,phone,location, password } = this.state;

  const data = {
    nt_ID:NTID,
    first_name:firstName,
    last_name:lastName,
    email,
    phone,
    location,
    password,
  };
console.log(JSON.stringify(data));
  try {
    const response = await fetch('http://127.0.0.1:8000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    alert('Form submitted successfully!');
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Error submitting form');
  }
  };

  constructor(props: any) {
   super(props);
   this.state = {
     NTID: '',
     firstName: '',
     lastName: '', 
     email: '',
     phone:'',
     location:'',
     password: ''
   };
   this.handleChange = this.handleChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
 }
 

  render() {
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h2>Sign Up</h2>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="fullName">
              <div>
                <label htmlFor="firstName">First Name  :  </label>
                <input type="text" name="firstName" onChange={this.handleChange} />
              </div>
              <div>
                <label htmlFor="lastName">Last Name  :  </label>
                <input type="text" name="lastName" onChange={this.handleChange} />
              </div>
            </div>
            <div className="NTID">
              <label htmlFor="NTID">NT ID  :  </label>
              <input type="text" name="NTID" onChange={this.handleChange} />
            </div>
            <div>
              <label htmlFor="location">Location:</label>
              <select name="location" value={this.state.location} onChange={this.handleChange} required>
              <option value="">Select a location</option>
                <option value="ADU">ADU</option>
                <option value="OMTP">OMTP</option>
                <option value="EC">EC</option>
              </select>
            </div>
            <div className="phone">
              <label htmlFor="phone">Phone  :  </label>
              <input type="text" name="phone" onChange={this.handleChange} />
            </div>
            <div className="email">
              <label htmlFor="email">Email  : </label>
              <input type="email" name="email" onChange={this.handleChange} />
            </div>
            <div className="password">
              <label htmlFor="password">Password  :  </label>
              <input type="password" name="password" onChange={this.handleChange} />
            </div>
            <div className="submit">
              <button type="submit">Register Me</button>
              
            </div>
          </form>
        </div>
      </div>
    );
  }
}
