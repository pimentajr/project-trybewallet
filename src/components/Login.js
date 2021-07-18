import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { emailAction } from '../actions';

import '../App.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailIsBad: true,
      pwdIsBad: true,
      email: '',
    };
    this.checkPassword = this.checkPassword.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  checkEmail(e) {
    const emailRegex = /^(\S+)@((?:(?:(?!-)[a-z0-9-]{1,62}[a-z0-9])\.)+[a-z0-9]{2,12})$/;
    const { value } = e.target;
    if (emailRegex.test(value)) {
      this.setState({
        emailIsBad: false,
        email: value });
    } else this.setState({ emailIsBad: true });
  }

  checkPassword(e) {
    const { value } = e.target;
    const pwdMinimumLength = 6;
    if (value.length >= pwdMinimumLength) this.setState({ pwdIsBad: false });
    else this.setState({ pwdIsBad: true });
  }

  handleClick() {
    const { saveEmail } = this.props;
    const { email } = this.state;
    saveEmail(email);
  }

  render() {
    const { emailIsBad, pwdIsBad } = this.state;

    return (
      <form className="login">
        <label
          htmlFor="email"
        >
          Digite seu e-mail
          <input
            id="email"
            data-testid="email-input"
            onChange={ this.checkEmail }
            type="email"
          />
        </label>
        <label
          htmlFor="password"
        >
          Insira sua senha
          <input
            id="password"
            data-testid="password-input"
            onChange={ this.checkPassword }
            type="password"
          />
        </label>
        <Link to="/carteira">
          <button
            type="button"
            disabled={ emailIsBad || pwdIsBad }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(emailAction(email)),
});

Login.propTypes = {
  saveEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
