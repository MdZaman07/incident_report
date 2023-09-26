import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = this.state;

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
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
          {/* Input fields for username and password */}
          {/* ... */}
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
