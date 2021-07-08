import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div>
        <input
          id="login"
          data-testid="email-input"
          placeholder="Campo de email"
        />

        <input
          type="password"
          data-testid="password-input"
          placeholder="Campo de senha"
        />

        <input type="button" value="Entrar"/>
      </div>);
  }
}

export default Login;
