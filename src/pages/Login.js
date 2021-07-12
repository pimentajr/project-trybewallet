import React from 'react';

const emailRegexp = new RegExp('\\S+@\\S+\\.\\S+');

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      status: true,
      pwLength: '',
    };

    this.validaLogin = this.validaLogin.bind(this);
    this.handle = this.handle.bind(this);
  }

  handle({ target }) {
    this.setState({ [target.name]: target.value });
  }

  validaLogin() { // Fonte: MDN (https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/disabled)
    const { email, pwLength } = this.state;
    const NUMBER = 6;

    if (emailRegexp.test(email) && pwLength.length >= NUMBER) {
      this.setState({
        status: false,
      });
    } else {
      this.setState({
        status: true,
      });
    }
  }

  render() {
    const { email, status, pwLength } = this.state;

    return (
      <div className="Login">
        <h1>Login</h1>
        <br />
        <input
          value={ email }
          name="email"
          data-testid="email-input"
          className="inputField"
          type="text"
          placeholder="E-mail"
          onKeyUp={ this.validaLogin }
          onChange={ this.handle }
        />
        <br />
        <input
          value={ pwLength }
          name="pwLength"
          data-testid="password-input"
          className="inputField"
          type="password"
          placeholder="Senha"
          onKeyUp={ this.validaLogin }
          onChange={ this.handle }
        />
        <br />
        <button
          className="loginButton"
          type="button"
          disabled={ status }
        >
          Entrar
        </button>

      </div>
    );
  }
}

export default Login;
