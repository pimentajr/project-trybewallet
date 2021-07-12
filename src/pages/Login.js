import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div>
        <div>
          <label htmlFor="email-input">
            Email
            <input type="text" data-testid="email-input" />
          </label>
          <label htmlFor="password-input">
            Senha
            <input type="password" data-testid="password-input" />
          </label>
          <button type="submit">Entrar</button>
        </div>
      </div>
    );
  }
}

export default Login;
