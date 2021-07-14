import React from 'react';
import LoginButton from '../components/LoginButton';

class Login extends React.Component {
  render() {
    return (
      <div>
        Login
        <input data-testid="email-input" placeholder="E-mail" />
        <input data-testid="password-input" placeholder="Senha" />
        <LoginButton />
      </div>
    );
  }
}

export default Login;
