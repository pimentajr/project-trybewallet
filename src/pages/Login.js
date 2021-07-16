import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div>
        <input
          type="email"
          data-testid="email-input"
          placeholder="E-mail"
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Password"
        />
        <button type="button">Entrar</button>
      </div>
    );
  }
}

export default Login;
