import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { sendLogin } from '../actions';

const emailRegexp = new RegExp('\\S+@\\S+\\.\\S+');

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      status: true,
      pwLength: '',
    };

    this.validaLogin = this.validaLogin.bind(this);
    this.handle = this.handle.bind(this);
    // this.sendAndEnter = this.sendAndEnter.bind(this);
  }

  handle({ target }) {
    this.setState({ [target.name]: target.value });
  }

  validaLogin() { // Fonte: MDN (https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/disabled)
    const { email, pwLength } = this.state;
    const NUMBER = 6;

    if (emailRegexp.test(email) && pwLength.length >= NUMBER) {
      this.setState({
        status: false,
      });
    } else {
      this.setState({
        status: true,
      });
    }
  }

  render() {
    const { email, status, pwLength } = this.state;
    const { sendAndEnter } = this.props;

    return (
      <div className="Login">
        <h1>Login</h1>
        <br />
        <input
          value={ email }
          name="email"
          data-testid="email-input"
          className="inputField"
          type="text"
          placeholder="E-mail"
          onKeyUp={ this.validaLogin }
          onChange={ this.handle }
        />
        <br />
        <input
          value={ pwLength }
          name="pwLength"
          data-testid="password-input"
          className="inputField"
          type="password"
          placeholder="Senha"
          onKeyUp={ this.validaLogin }
          onChange={ this.handle }
        />
        <br />
        <Link to="/carteira">
          <button
            className="loginButton"
            type="button"
            disabled={ status }
            onClick={ () => sendAndEnter(email) }
          >
            Entrar
          </button>
        </Link>

      </div>
    );
  }
}

const mapDispatchToprops = (dispatch) => ({
  sendAndEnter: (payload) => dispatch(sendLogin(payload)),
});

Login.propTypes = {
  sendAndEnter: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToprops)(Login);
