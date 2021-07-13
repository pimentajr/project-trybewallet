import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      validLogin: false,
    };
    this.loginValidation = this.loginValidation.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  loginValidation() {
    const { email, password } = this.state;
    const emailpattern = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const minPasswordLength = 5;
    if (emailpattern.test(email) && password.length >= minPasswordLength) {
      this.setState({ validLogin: true });
    }
    // informação encontrada e adaptada de https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  }

  handleLogin({ target: { value, id } }) {
    this.setState({ [id]: value });
    this.loginValidation();
  }

  render() {
    const { email, password, validLogin } = this.state;
    return (
      <section>
        <h1>TrybeWallet Login</h1>
        <form>
          <input
            type="email"
            id="email"
            data-testid="email-input"
            value={ email }
            placeholder="digite seu email"
            onChange={ this.handleLogin }
          />
          <input
            type="password"
            id="password"
            data-testid="password-input"
            value={ password }
            placeholder="digite sua senha"
            onChange={ this.handleLogin }
          />
          <button
            type="submit"
            disabled={ !validLogin }
          >
            Entrar
          </button>
        </form>
      </section>
    );
  }
}

export default Login;
