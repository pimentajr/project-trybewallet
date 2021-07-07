import React, { Component } from 'react';

class SingIn extends Component {
  render() {
    return (
      <div>
        <input
          data-testid="email-input"
          placeholder="Email"
        />
        <input
          data-testid="password-input"
          placeholder="Password"
        />
        <button type="button">Entrar</button>
      </div>
    );
  }
}

export default SingIn;
