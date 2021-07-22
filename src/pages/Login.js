import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { loginEnterClickAction } from '../actions';
import PasswordInput from '../components/PasswordInput';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      shouldRedirect: false,
    };
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.handleOnChangeInputsValidation = this.handleOnChangeInputsValidation.bind(this);
    this.onclickEnterHandle = this.onclickEnterHandle.bind(this);
  }

  componentDidMount() {
    const btn = document.querySelector('#enter-btn');
    btn.disabled = true;
  }

  onclickEnterHandle() {
    const getEmail = document.querySelector('#email');
    const { email } = this.props;
    email(getEmail.value);
    this.setState({
      shouldRedirect: true,
    });
  }

  validateEmail() {
    const email = document.querySelector('#email');
    const error = document.querySelector('#error-email');
    if (!email.checkValidity()) {
      error.style.color = 'red';
      error.innerHTML = 'Email inválido';
    } else if (email.checkValidity()) {
      error.style.color = 'green';
      error.innerHTML = 'Email Ok';
    }
  }

  validatePassword() {
    const password = document.querySelector('#password');
    const errorPassword = document.querySelector('#error-password');
    const SIX = 6;

    if (password.value.length < SIX) {
      errorPassword.innerHTML = 'Senha inválida';
    } else if (password.value.length >= SIX) {
      errorPassword.style.color = 'green';
      errorPassword.innerHTML = 'Senha Ok';
    }
  }

  handleOnChangeInputsValidation() {
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const btn = document.querySelector('#enter-btn');
    const SIX = 6;
    if (email.checkValidity() && password.value.length >= SIX) {
      btn.disabled = false;
    } else if (!email.checkValidity() || password.value.length < SIX) {
      btn.disabled = true;
    }
  }

  render() {
    const { shouldRedirect } = this.state;
    if (shouldRedirect) return (<Redirect to="/carteira" />);
    return (
      <div className="login-container">
        <h2>Login:</h2>
        <form name="login">
          <div className="email-input-container">
            <input
              id="email"
              className="email-input"
              data-testid="email-input"
              type="email"
              placeholder="Digite seu Email"
              onBlur={ this.validateEmail }
              onChange={ this.handleOnChangeInputsValidation }
            />
          </div>
          <span id="error-email" />
          <PasswordInput
            func={ this.handleOnChangeInputsValidation }
            func2={ this.validatePassword }
          />
          <span id="error-password" />
        </form>
        <button
          id="enter-btn"
          type="button"
          onClick={ this.onclickEnterHandle }
        >
          Entrar
        </button>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  email: (email) => dispatch(loginEnterClickAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  email: PropTypes.func.isRequired,
};
