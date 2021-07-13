import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as user from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disableButton: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
      disableButton: true,
    }, () => {
      if (this.checkEmail && this.checkPassword()) {
        this.setState({
          disableButton: false,
        });
      }
    });
  }

  checkEmail() {
    const { email } = this.state;
    const eVrfy = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return eVrfy.test(email);
  }

  checkPassword() {
    const { password } = this.state;
    const minimunPassword = 6;
    return (password.length >= minimunPassword);
  }

  render() {
    const { email, password, disableButton } = this.state;
    const { setEmail } = this.props;
    return (
      <div className="login-page">
        <div className="login-logo">
          <h1>Trybewallet</h1>
        </div>
        <div className="login-fields">
          <input
            name="email"
            type="text"
            data-testid="email-input"
            onChange={ (e) => this.handleChange(e) }
            value={ email }
            placeholder="Digite um e-mail válido"
          />
          <input
            name="password"
            type="text"
            data-testid="password-input"
            onChange={ (e) => this.handleChange(e) }
            value={ password }
            placeholder="Digite a senha com no mínimo 6 caracteres"
          />
          <Link to={ { pathname: 'carteira' } }>
            <button
              disabled={ disableButton }
              type="button"
              onClick={ () => setEmail(email) }
            >
              Entrar
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  { setEmail: (email) => dispatch(user.setEmail(email)) }
);

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  setEmail: PropTypes.func.isRequired,
};
