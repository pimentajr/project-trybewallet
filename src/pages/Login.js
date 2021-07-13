import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.validateLogin = this.validateLogin.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
  }

  validateLogin() {
    const { email, password } = this.state;
    const number = 6;
    const re = /\S+@\S+\.\S+/;
    if (re.test(email) && (password.length >= number)) {
      return false;
    }
    return true;
  }

  handleEmail({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <hi>Login</hi>
        <label htmlFor="email">
          E-mail
          <input
            id="email"
            type="text"
            data-testid="email-input"
            name="email"
            required
            onChange={ this.handleEmail }
            value={ email }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            id="password"
            type="text"
            data-testid="password-input"
            maxLength="6"
            name="password"
            onChange={ this.handleEmail }
            value={ password }
            required
          />
        </label>
        <Link to="/carteira">
          <button type="button" disabled={ this.validateLogin() }>
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

export default Login;
