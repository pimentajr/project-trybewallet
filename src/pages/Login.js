import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <form>
        <input
          data-testid="email-input"
          type="email"
          placeholder="Email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          title="email inválido"
          // onChange={ handleEmailChange }
        />
        <input
          data-testid="password-input"
          type="password"
          placeholder="Senha"
          pattern=".{6,}"
          title="senha inválida"
          // onChange={ handlePasswordChange }
        />
        <button type="button">Entrar</button>
      </form>
    );
  }
}

export default Login;
