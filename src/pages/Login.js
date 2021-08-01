import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div>
        <h1>Trybe Wallet</h1>
        <form>
          <label htmlFor="email">
            Login:
            <input
              type="email"
              data-testid="email-input"
              name="email"
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              type="password"
              data-testid="password-input"
              name="password"
            />
          </label>
          <button
            type="submit"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
