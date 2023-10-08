import React, { Component } from 'react';
import './login.css';

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

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  render() {
    return (
      <div className="Login">
        <h4>Login</h4>
        <form onSubmit={this.handleSubmit}>
          {/* Input field for username */}
          <input
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={(e) => this.setState({ username: e.target.value })}
            required
          />
          {/* Input field for password */}
          <input
            type="password" // Change the input type to "password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
            required
          />
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

