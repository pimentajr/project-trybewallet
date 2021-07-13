import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleInputs = this.handleInputs.bind(this);
    this.verifyLogin = this.verifyLogin.bind(this);
  }

  verifyLogin() { // https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/
    const { email, password } = this.state;
    const re = /\S+@\S+\.\S+/;
    const minNumber = 6;
    if (re.test(email) && password.length >= minNumber) {
      return false;
    }
    return true;
  }

  handleInputs(name, value) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        Login
        <input
          data-testid="email-input"
          type="email"
          placeholder="Email"
          value={ email }
          onChange={ (event) => this.handleInputs('email', event.target.value) }
        />
        <input
          data-testid="password-input"
          type="password"
          placeholder="password"
          value={ password }
          onChange={ (event) => this.handleInputs('password', event.target.value) }
          min="6"
        />
        <Link to="/carteira">
          <button
            type="submit"
            disabled={ this.verifyLogin() }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

export default Login;
