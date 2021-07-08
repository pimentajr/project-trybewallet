import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <form>
        <input data-testid="email-input" type="email" placeholder="Digite seu e-mail" />
        <input data-testid="password-input" type="password" placeholder="Digite sua Senha" />
        <button type="submit">Entrar</button>
      </form>
    );
  }
}

export default Login;
