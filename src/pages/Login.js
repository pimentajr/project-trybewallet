import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loginAction } from '../actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      validate: true,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { value, name } = target;

    this.setState({
      [name]: value,
    }, () => this.setState({ validate: !this.validateLogin() }));
  }

  validateLogin() {
    const { email, password } = this.state;
    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const passMin = 6;
    return regexEmail.test(email) && password.length >= passMin;
  }

  render() {
    const { validateButton } = this.props;
    const { email, password, validate } = this.state;
    return (
      <div>
        <div>
          <label htmlFor="email-input">
            Email
            <input
              name="email"
              type="text"
              data-testid="email-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password-input">
            Senha
            <input
              name="password"
              type="password"
              data-testid="password-input"
              onChange={ this.handleChange }
            />
          </label>
          <Link to="/carteira">
            <button
              disabled={ validate }
              type="submit"
              onClick={ () => validateButton(email, password) }
            >
              Entrar
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  validateButton: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  validateButton: (email, password) => dispatch(loginAction(email, password)),
});

export default connect(null, mapDispatchToProps)(Login);
