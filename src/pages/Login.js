import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div className="login-container">
        <h3>Login</h3>
        <label htmlFor="email-login">
          Email:
          <input data-testid="email-input" type="text" name="email" />
        </label>
      </div>
    );
  }
}

export default Login;
