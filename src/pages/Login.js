import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  render() {
    return (
      <div>
        <form>
          Login
          <input type="email" data-testid="email-input" />
          Senha
          <input type="password" data-testid="password-input" />
        </form>
        <Link to="/carteira">
          Entrar
        </Link>
      </div>
    );
  }
}

export default Login;
