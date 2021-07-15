import React from 'react';

class FormLogin extends React.Component {
  render() {
    return (
      <div>
        <form>
          <p>Login</p>
          <input
            data-testid="email-input"
            name="name"
            type="email"
            placeholder="alguem@alguem.com"
          />
          <input
            data-testid="password-input"
            name="password"
            type="password"
            placeholder="Your password"
          />
        </form>
      </div>
    );
  }
}

export default FormLogin;

// Form for the user to enter their email and password
