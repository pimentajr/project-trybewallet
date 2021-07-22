import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectWallet: false,
    };
    this.inputPasswordRender = this.inputPasswordRender.bind(this);
  }

  inputPasswordRender() {
    return (
      <input
        id="password"
        type="password"
        data-textid="password-input"
        placeholder="Senha"
        onBlur={ this.validatePassword }
        onChange={ this.handleOnChangeInputsValidation }
      />
    );
  }

  render() {
    return (
      <>
        <h2>Login:</h2>
        <form>
          <input
            id="email"
            type="email"
            data-testid="email-input"
            placeholder="E-mail"
            onBlur={ this.validateEmail }
            onChange={ this.handleOnChangeInputsValidation }
          />
          <span id="email-error" />
          { this.inputPasswordRender() }
          {}
          <span id="password-error" />
        </form>
        <button
          type="button"
          id="enter-btn"
          onClick={ this.onClickEnterHandle }
        >
          Entrar
        </button>
      </>
    );
  }
}

export default Login;
