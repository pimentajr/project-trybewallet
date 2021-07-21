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
    const { email, password } = this.state;
    return (
      <div>
        <label htmlFor="email">
          E-mail:
          <input
            data-testid="email-input"
            value={ email }
            type="text"
            id="email"
            name="email"
          />

        </label>
        <label htmlFor="password">
          Senha:
          <input
            data-testid="password-input"
            value={ password }
            type="password"
            id="password"
            name="password"
          />
        </label>
        <button type="button" disabled>Entrar</button>
      </div>
    );
  }
}

export default Login;
