import React, { Component } from 'react';
import './login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        console.log('Login successful');
        // Redirect to the dashboard or perform other actions upon successful login
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div className="Login">
        <h4>Login</h4>
        <form onSubmit={this.handleSubmit}>
          <input type='text' name='email' onChange={this.handleInputChange} id='email' placeholder='Email'></input>
          <input type='password' name='password' onChange={this.handleInputChange} id='password' placeholder='Password'></input>
          <input type="submit" value="LOGIN" className="btn" />
        </form>
        <a className="link" href="/signup.js">
          Sign Up
        </a>
      </div>
    );
  }
}

export default Login;
