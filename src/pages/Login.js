import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { walletLogin } from '../actions';
import verifyEmailWithRegex from '../helpers/verifyEmail';

class Login extends Component {
  constructor() {
    super();
    this.state = ({
      email: '',
      password: '',
    });
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { type, value } = target;
    this.setState({ [type]: value });
  }

  loginWallet() {
    const { login, history } = this.props;
    const { email } = this.state;
    login(email);
    this.setState = ({
      email: '',
      password: '',
    });
    history.push('/carteira');
  }

  render() {
    const { email, password } = this.state;
    const user = {
      email,
      password,
    };
    return (
      <div>
        <form>
          <input
            type="email"
            data-testid="email-input"
            onChange={ (e) => this.handleChange(e) }
          />
          <input
            type="password"
            data-testid="password-input"
            onChange={ (e) => this.handleChange(e) }
          />
          <button
            type="button"
            onClick={ () => this.loginWallet() }
            disabled={ !verifyEmailWithRegex(user) }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (userEmail) => dispatch(walletLogin(userEmail)),
});

export default connect(null, mapDispatchToProps)(Login);
