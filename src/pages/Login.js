import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <section>
        <h1>TrybeWallet Login</h1>
        <form>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            data-testid="email-input"
          />
          <input
            type="password"
            placeholder="Digite sua senha"
            data-testid="password-input"
          />
          <button
            type="submit"
          >
            Entrar
          </button>
        </form>
      </section>
    );
  }
}

export default Login;
