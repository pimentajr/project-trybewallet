import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogin } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleInputs = this.handleInputs.bind(this);
    this.verifyLogin = this.verifyLogin.bind(this);
  }

  verifyLogin() { // https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/
    const { email, password } = this.state;
    const re = /\S+@\S+\.\S+/;
    const minNumber = 6;
    if (re.test(email) && password.length >= minNumber) {
      return false;
    }
    return true;
  }

  handleInputs(name, value) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, password } = this.state;
    const { sendLoginDispatch } = this.props;
    return (
      <div>
        Login
        <input
          data-testid="email-input"
          type="email"
          placeholder="Email"
          value={ email }
          onChange={ (event) => this.handleInputs('email', event.target.value) }
        />
        <input
          data-testid="password-input"
          type="password"
          placeholder="password"
          value={ password }
          onChange={ (event) => this.handleInputs('password', event.target.value) }
        />
        <Link to="/carteira">
          <button
            type="button"
            onClick={ () => sendLoginDispatch(email) }
            disabled={ this.verifyLogin() }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendLoginDispatch: (state) => dispatch(userLogin(state)),
});

Login.propTypes = {
  sendLoginDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
