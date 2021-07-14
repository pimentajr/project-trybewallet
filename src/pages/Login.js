import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  handleButton() {
    const { email, password } = this.state;
    const validEmail = /\S+@\S+\.\S+/;
    const pwLength = 6;
    // console.log(password.length >= pwLength);
    // console.log(validEmail.test(email));
    // console.log(email);
    // console.log(password);
    if ((password.length >= pwLength) && (validEmail.test(email))) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <div className="login-container">
        <h3>Login</h3>
        <label htmlFor="email-login">
          <input
            data-testid="email-input"
            type="text"
            name="email"
            placeholder="Email"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="passwaord-login">
          <input
            data-testid="password-input"
            type="password"
            name="password"
            placeholder="Senha"
            onChange={ this.handleChange }
          />
        </label>
        <Link to="/carteira">
          <button type="button" disabled={ this.handleButton() }>Entrar</button>
        </Link>
      </div>
    );
  }
}

export default Login;
