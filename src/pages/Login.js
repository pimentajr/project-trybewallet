import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div>
        <input data-testid="email-input" />
        <input data-testid="password-input" />
        <button type="submit">
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
