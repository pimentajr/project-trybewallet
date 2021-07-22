import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // redirectWallet: false,
    };
    this.inputPasswordRender = this.inputPasswordRender.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }

  componentDidMount() {
    const btn = document.querySelector('#enter-btn');
    btn.disabled = true;
  }

  validateEmail() {
    const email = document.querySelector('#email');
    const error = document.querySelector('#email-error');
    if (!email.checkValidity()) {
      error.style.color = 'red';
      error.innerHTML = 'E-mail inválido';
    } else if (email.checkValidity()) {
      error.style.color = 'green';
      error.innerHTML = 'Ok!';
    }
  }

  validatePassword() {
    const password = document.querySelector('#password');
    const error = document.querySelector('#password-error');
    const SIX = 6;
    if (password.value.length < SIX) {
      error.style.color = 'red';
      error.innerHTML = 'Senha inválida';
    } else if (password.value.length >= SIX) {
      error.style.color = 'green';
      error.innerHTML = 'Ok!';
    }
  }

  handleOnChangeInputsValidation() {
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const btn = document.querySelector('#enter-btn');
    const SIX = 6;

    if (email.checkValidity() && password.value.length >= SIX) {
      btn.disabled = false;
    } else btn.disabled = true;
  }

  inputPasswordRender() {
    return (
      <input
        id="password"
        type="password"
        data-testid="password-input"
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
