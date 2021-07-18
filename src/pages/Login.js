import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { walletLogin } from '../actions';

class Login extends Component {
  constructor() {
    super();
    this.state = ({
      email: '',
      password: '',
    });
    this.handleChange = this.handleChange.bind(this);
    this.verifyRegexEmail = this.verifyRegexEmail.bind(this);
  }

  verifyRegexEmail() {
    /** Para realizar o uso de verificação do email, usei o regex pattern email abaixo:
     * Source: https://forum.blip.ai/t/resolvido-regex-para-validacao-de-email/1635 */
    const { email, password } = this.state;
    const minPasswordLength = 6;
    const emailRegex = /^([\w.-]+)@([\w-]+)((\.(\w){2,3})+)$/;
    return (emailRegex.test(email) && password.length >= minPasswordLength);
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
            disabled={ !this.verifyRegexEmail() }
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
