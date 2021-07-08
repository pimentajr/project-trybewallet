import React from 'react';
import FormsLogin from '../components/FormsLogin';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isEmailValid: false,
      isPasswordValid: false,
    };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleChangeEmail({ target: { value } }) {
    const email = value;
    const regTest = /[a-zA-Z0-9]+[.]?([a-zA-Z0-9]+)?[@][a-z]{3,9}[.][a-z]{2,5}/g;
    const resultTest = regTest.test(email);

    this.setState({ isEmailValid: resultTest });
  }

  handleChangePassword({ target: { value } }) {
    const password = value;
    const passwordMinLength = 6;

    if (password.length >= passwordMinLength) {
      this.setState({ isPasswordValid: true });
    } else {
      this.setState({ isPasswordValid: false });
    }
  }

  render() {
    const { isEmailValid, isPasswordValid } = this.state;

    const isDisabled = !(isEmailValid && isPasswordValid);

    return (
      <FormsLogin
        handleChangeEmail={ this.handleChangeEmail }
        handleChangePassword={ this.handleChangePassword }
        isDisabled={ isDisabled }
      />
    );
  }
}

export default Login;
