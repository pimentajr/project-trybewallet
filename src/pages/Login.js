import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendInfo } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckFields = this.handleCheckFields.bind(this);
  }

  handleChange(name, value) {
    this.setState({
      [name]: value,
    });
  }

  handleCheckFields() {
    const { email, password } = this.state;
    const emailValidation = new RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
    );
    const passwordValidation = 6;
    if (emailValidation.test(email)
     && password.length >= passwordValidation) {
      return false;
    }
    return true;
  }

  render() {
    const { email, password } = this.state;
    const { sendInfoDispatch } = this.props;

    return (
      <div>
        Login
        <label htmlFor="email">
          Email:
          <input
            placeholder="Email"
            name="email"
            type="email"
            data-testid="email-input"
            value={ email }
            onChange={ (event) => this.handleChange('email', event.target.value) }

          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            placeholder="Senha"
            name="password"
            type="password"
            data-testid="password-input"
            value={ password }
            onChange={ (event) => this.handleChange('password', event.target.value) }
          />
        </label>
        <Link to="/carteira">
          <button
            type="button"
            onClick={ () => sendInfoDispatch(email) }
            disabled={ this.handleCheckFields() }
          >
            Entrar
          </button>

        </Link>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendInfoDispatch: (email) => dispatch(sendInfo(email)),
});

Login.propTypes = {
  sendInfoDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
