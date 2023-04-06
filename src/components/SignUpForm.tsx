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
    const { firstName, lastName, dob, ntID, employeeID, email, password } = this.state;

  const data = {
    first_name:firstName,
    last_name:lastName,
    dob,
    nt_Id:ntID,
    employee_Id:employeeID,
    email,
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
     firstName: '',
     lastName: '',
     dob: '',
     ntID: '',
     employeeID: '',
     email: '',
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
            <div className="dob">
              <label htmlFor="dob">Date of Birth  :  </label>
              <input type="date" name="dob" onChange={this.handleChange} />
            </div>
            <div className="ntID">
              <label htmlFor="ntID">NT ID  :  </label>
              <input type="text" name="ntID" onChange={this.handleChange} />
            </div>
            <div className="employeeID">
              <label htmlFor="employeeID">Employee ID  :  </label>
              <input type="text" name="employeeID" onChange={this.handleChange} />
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
