import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div>
        <form action="">
          <label htmlFor="email-input">
            Email:
            <input data-testid="email-input" type="text" />
          </label>
          <label htmlFor="password-input">
            Senha:
            <input data-testid="password-input" type="text" />
          </label>
          <button disabled type="button">Entrar</button>
        </form>
      </div>
    );
  }
}

export default Login;
