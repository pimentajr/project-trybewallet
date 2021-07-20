import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { enviaEmailParaStore } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      // email: '',
      redirectToWallet: false,
      testEmail: true,
      testPass: true,
    };
    this.handlePass = this.handlePass.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleClickBtn = this.handleClickBtn.bind(this);
  }

  handlePass({ target: { value } }) {
    const number = 6;
    if (value.length < number) {
      this.setState({ testPass: true });
    }
    if (value.length >= number) {
      this.setState({ testPass: false });
    }
  }

  handleEmail({ target: { value } }) {
    // this.setState({ email: value });
    // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (reg.test(value)) {
      this.setState({ testEmail: false });
    } else {
      this.setState({ testEmail: true });
    }
  }

  handleClickBtn() {
    const { sendEmailToStore } = this.props;
    const email = document.querySelector('#email');
    sendEmailToStore(email.value);
    this.setState({
      redirectToWallet: true,
    });
  }

  render() {
    const { testEmail, testPass, redirectToWallet } = this.state;
    if (redirectToWallet) return <Redirect to="/carteira" />;
    return (
      <div>
        <h1>Login</h1>
        <form>
          <input
            data-testid="email-input"
            onChange={ this.handleEmail }
            type="email"
            id="email"
          />
          <input
            data-testid="password-input"
            onChange={ this.handlePass }
            type="password"
          />
          <button
            type="button"
            onClick={ this.handleClickBtn }
            disabled={ testPass || testEmail }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendEmailToStore: (email) => dispatch(enviaEmailParaStore(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  sendEmailToStore: PropTypes.func,
};
Login.defaultProps = {
  sendEmailToStore: PropTypes.func,
};
