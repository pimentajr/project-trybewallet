import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      senha: '',
      button: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.verifyMail);
  }

  verifyMail() {
    const { Email, password } = this.state;
    const rgxEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const testEmail = rgxEmail.test(Email);
    const passwordMin = 6;

    if (testEmail && password.length >= passwordMin) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  render() {
    const { Email, password, disabled } = this.state;
    const { email } = this.props;
    return (
      <form>

        <label htmlFor="email">
          <input
            type="text"
            data-testid="email-input"
            placeholder="Digite o e-mail"
            name="Email"
            value={ Email }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="password">
          <input
            type="text"
            data-testid="password-input"
            placeholder="Digite a senha"
            name="password"
            value={ Email }
            onChange={ this.handleChange }
          />
        </label>
      </form>
    )
  }
}

export default Login;
