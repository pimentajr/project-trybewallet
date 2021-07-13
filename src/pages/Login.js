import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  render() {
    return (
      <div>
        <hi>Login</hi>
        <label htmlFor="email">
          E-mail
          <input
            id="email"
            type="text"
            data-testid="email-input"
            name="email"
            required
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            id="password"
            type="text"
            data-testid="password-input"
            maxLength="6"
            name="password"
            required
          />
        </label>
        <Link to="/wallet">
          <button type="button">Entrar</button>
        </Link>
      </div>
    );
  }
}

export default Login;
