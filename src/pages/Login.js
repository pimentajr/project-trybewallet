import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div className="Login">
        <h1>Login</h1>
        <br />
        <input
          data-testid="email-input"
          className="inputField"
          type="text"
          placeholder="E-mail"
        />
        <br />
        <input className="inputField" type="password" placeholder="Senha" />
        <br />
        <button
          data-testid="password-input"
          lassName="inputField"
          type="button"
        >
          Entrar
        </button>

      </div>
    );
  }
}

export default Login;
