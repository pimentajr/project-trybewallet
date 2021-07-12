import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="email">
          E-mail
          <input
            data-testid="email-input"
            type="text"
            name="email"
            placeholder="Digite seu email"
          />
        </label>

        <label htmlFor="password">
          Senha
          <input
            data-testid="password-input"
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
        </label>

        <button type="button">Entrar</button>
      </form>
    );
  }
}

export default Login;
