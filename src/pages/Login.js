import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div>
        <div>
          <form>
            <input placeholder="e-mail" type="email" data-testid="email-input" />
            <input placeholder="password" type="password" data-testid="password-input" />
            <button type="button">Entrar</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
