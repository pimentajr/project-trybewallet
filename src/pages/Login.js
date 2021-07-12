import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import userEmail from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pass: '',
      isDisabled: false,
    };

    this.enableButton = this.enableButton.bind(this);
    this.hadleChange = this.hadleChange.bind(this);
    this.hadleClickButton = this.hadleClickButton.bind(this);
  }

  enableButton() {
    const { email, pass } = this.state;
    const MIN_CARACTERE = 5;
    const emailValid = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    if (emailValid.test(email) && pass.length >= MIN_CARACTERE) {
      this.setState({ isDisabled: true });
    } else {
      this.setState({ isDisabled: false });
    }
  }

  hadleChange({ target: { value, name } }) {
    this.setState({ [name]: value });
    this.enableButton();
  }

  hadleClickButton() {
    const { email, isDisabled } = this.state;
    const { emailDispatch } = this.props;
    if (isDisabled) emailDispatch(email);
  }

  render() {
    const { isDisabled } = this.state;
    return (
      <form>
        <label htmlFor="email-input">
          <input
            data-testid="email-input"
            type="email"
            name="email"
            placeholder="Email"
            onChange={ this.hadleChange }
          />
        </label>
        <label htmlFor="password-input">
          <input
            data-testid="password-input"
            type="password"
            name="pass"
            placeholder="Senha"
            onChange={ this.hadleChange }
          />
        </label>
        <Link to="/carteira">
          <button
            type="button"
            disabled={ !isDisabled }
            onClick={ this.hadleClickButton }
          >
            Entrar
          </button>
        </Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  emailDispatch: (email) => dispatch(userEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  emailDispatch: PropTypes.func.isRequired,
};
