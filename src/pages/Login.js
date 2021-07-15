import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import signUp from '../actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  render() {
    const { email, password } = this.state;
    const emailRegex = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi; // (regex) https://regexr.comm/2ri2c
    const six = 6;
    const { login } = this.props;
    return (
      <div>
        <h3>Login</h3>

        <input
          data-testid="email-input"
          type="text"
          placeholder="E-mail"
          onChange={ (event) => this.setState({ email: event.target.value }) }
        />

        <input
          data-testid="password-input"
          type="text"
          placeholder="Senha"
          onChange={ (event) => this.setState({ password: event.target.value }) }

        />

        <Link to="/carteira">
          <button
            type="submit"
            disabled={
              !(email.match(emailRegex)) || password.length < six // validação de email e senha (six por conta do magicNumber)
            }
            onClick={ () => login(email) }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDisptchToProps = (dispatch) => ({
  login: (email) => dispatch(signUp(email)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, mapDisptchToProps)(Login);
