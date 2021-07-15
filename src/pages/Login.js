import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      buttonDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.loginValidation = this.loginValidation.bind(this);
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value });
    this.loginValidation();
  }

  loginValidation() {
    const { email, password } = this.state;
    const mainEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordLength = 5;
    if (password.length >= passwordLength && email.match(mainEmail)) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  }

  render() {
    const { buttonDisabled } = this.state;
    return (
      <div>
        Login
        <label htmlFor="email">
          <input
            type="text"
            name="email"
            placeholder="Email"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            placeholder="Senha"
            data-testid="password-input"
            onChange={ this.handleChange }
          />
        </label>
        <button type="button" disabled={ buttonDisabled }>
          Entrar
        </button>
      </div>
    );
  }
}
export default Login;
