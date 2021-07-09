import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disabled: true,
    };

    this.handleChanges = this.handleChanges.bind(this);
    this.loginValidator = this.loginValidator.bind(this);
  }

  componentDidUpdate() {
    this.loginValidator();
  }

  handleChanges({ target }) {
    this.setState({ [target.name]: target.value });
  }

  loginValidator() {
    const { email, password, disabled } = this.state;
    const passwordLenght = 5;
    if (email.includes('@')
      && email.includes('.com')
      && password.length > passwordLenght
      && disabled) {
      this.setState({ disabled: false });
    }
  }

  render() {
    const { email, password, disabled } = this.state;
    return (
      <div>
        <input
          value={ email }
          name="email"
          id="login"
          data-testid="email-input"
          placeholder="Campo de email"
          onChange={ this.handleChanges }
        />

        <input
          value={ password }
          name="password"
          type="password"
          data-testid="password-input"
          placeholder="Campo de senha"
          onChange={ this.handleChanges }
        />

        <input
          type="button"
          value="Entrar"
          onClick={ this.loginValidator }
          disabled={ disabled }
        />
      </div>);
  }
}

export default Login;
