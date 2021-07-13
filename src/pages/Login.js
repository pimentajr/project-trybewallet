import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userLoginAction } from '../actions';

import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isEmailValid: false,
      password: '',
      isPasswordValid: false,
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleEmailChange({ target }) {
    const { value } = target;
    const isEmailValid = this.validateEmail(value);
    this.setState({ email: value, isEmailValid });
  }

  validateEmail(string) {
    const regex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    if (string.match(regex)) {
      return true;
    }
    return false;
  }

  handlePasswordChange({ target }) {
    const { value } = target;
    const isPasswordValid = this.validatePassword(value);
    this.setState({ password: value, isPasswordValid });
  }

  validatePassword(string) {
    const minLength = 6;
    return string.trim().length >= minLength;
  }

  handleLogin(e) {
    e.preventDefault();
    const { userLogin } = this.props;
    const { email } = this.state;
    userLogin(email);
  }

  render() {
    const { isEmailValid, isPasswordValid, email, password } = this.state;
    const { loggedEmail } = this.props;

    if (loggedEmail) {
      return <Redirect to="/carteira" />;
    }

    return (
      <div className="login-container">
        <h1>TrybeWallet</h1>
        <form onSubmit={ this.handleLogin } className="login-form" autoComplete="off">
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            data-testid="email-input"
            required
            onChange={ this.handleEmailChange }
            value={ email }
          />
          <p className="login-validation-error">
            { (!isEmailValid && email.length > 0) && 'Digite um email válido'}
          </p>
          <input
            type="password"
            name="password"
            placeholder="Senha"
            data-testid="password-input"
            onChange={ this.handlePasswordChange }
            value={ password }
            required
          />
          <p className="login-validation-error">
            { (!isPasswordValid && password.length > 0)
            && 'Sua senha deve conter no mínimo 6 dígitos'}
          </p>
          <button
            type="submit"
            disabled={ !isEmailValid || !isPasswordValid }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedEmail: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  userLogin: (email) => dispatch(userLoginAction(email)),
});

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
  loggedEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
