import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <form>
        <input data-testid="email-input" />
        <input data-testid="password-input" />
        <button type="submit">Entrar</button>
      </form>
    );
  }
}

export default Login;
