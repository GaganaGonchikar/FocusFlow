import React from "react";
import './style.css';

export class Login extends React.Component {
  handleChange = (event : any) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(this.state);
  };

  handleSubmit = (event : any) => {
    event.preventDefault();
    // Handle form submission
  };

  constructor(props : any) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  render() {
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h2>Login</h2>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" onChange={this.handleChange} />
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" onChange={this.handleChange} />
            </div>
            <div className="submit">
              <button>Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
