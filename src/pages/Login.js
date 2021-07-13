import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as userActions from '../actions/user';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      emailIsvalid: false,
      passwordIsValid: false,
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  handleEmail(event) {
    this.setState({ email: event.target.value });
    this.validateEmail();
  }

  handlePassword(event) {
    this.setState({ password: event.target.value });
    this.validatePassword();
  }

  validatePassword() {
    const { password } = this.state;
    const regexPassword = /^[a-z\d]{5,25}$/;
    const result = regexPassword.test(password);
    if (result) {
      this.setState({ passwordIsValid: true });
    } else {
      this.setState({ passwordIsValid: false });
    }
  }

  validateEmail() {
    const { email } = this.state;
    const regexEmail = /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
    const result = regexEmail.test(email);
    if (result) {
      this.setState({ emailIsvalid: true });
    } else {
      this.setState({ emailIsvalid: false });
    }
  }

  validateForm() {
    const { emailIsvalid, passwordIsValid } = this.state;
    if (emailIsvalid && passwordIsValid) {
      return false;
    }
    return true;
  }

  submitLogin(event) {
    const { email } = this.state;
    event.preventDefault();
    const { login, history } = this.props;
    login(email);
    history.push('/carteira');
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="user-email">
            E-mail
            <input
              type="text"
              name="user-email"
              data-testid="email-input"
              placeholder="Digite seu e-mail válido"
              value={ email }
              onChange={ this.handleEmail }
            />
          </label>
          Senha
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              data-testid="password-input"
              placeholder="Digite uma senha válida"
              value={ password }
              onChange={ this.handlePassword }
            />
          </label>
          <button
            id="btn-validate"
            type="button"
            disabled={ this.validateForm() }
            onClick={ this.submitLogin }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (credentials) => dispatch(userActions.login(credentials)),
});

Login.propTypes = {
  login: PropTypes.func,
}.isrequired;
export default connect(null, mapDispatchToProps)(Login);
