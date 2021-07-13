import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
  }

  render() {
    return (
      <div>
        <label htmlFor="input-email">
          <input
            id="input-email"
            type="email"
            data-testid="email-input"
            placeholder="Digite seu E-Mail"
          />
        </label>
        <label htmlFor="input-password">
          <input
            id="input-password"
            type="password"
            data-testid="password-input"
            placeholder="Digite sua Senha"
          />
        </label>
        <button type="button">Entrar</button>
      </div>
    );
  }
}

export default Login;
