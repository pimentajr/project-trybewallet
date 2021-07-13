import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disable: true,
      redirect: false,
    };
  }

  render() {
    const { disable } = this.state;
    return (
      <div className="login-container">
        <h3>Login</h3>
        <label htmlFor="email-login">
          <input data-testid="email-input" type="text" name="email" placeholder="Email" />
        </label>
        <label htmlFor="passwaord-login">
          <input
            data-testid="password-input"
            type="password"
            name="password"
            placeholder="Senha"
          />
        </label>
        <button type="button" disabled={ disable }>Entrar</button>
      </div>
    );
  }
}

export default Login;
