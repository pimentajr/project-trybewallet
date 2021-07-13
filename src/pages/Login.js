import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userAction } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentDidUpdate() {
    this.validate();
  }

  validate() {
    const { email, password, disabled } = this.state;
    const number = 6;
    const verifyEmail = email.split('').includes('@') && email.split('.').includes('com');
    const verifyPassword = password.length >= number;
    if (verifyEmail && verifyPassword && disabled) {
      this.setState({ disabled: false });
    } else if ((!verifyEmail || !verifyPassword) && !disabled) {
      this.setState({ disabled: true });
    }
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { email, password, disabled } = this.state;
    const { dispatchSendEmail } = this.props;
    return (
      <div>
        <label htmlFor="email">
          Insira o E-mail:
          <input
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            data-testid="email-input"
            placeholder="nome@provedor.com"
          />
        </label>
        <label htmlFor="password">
          Insira a senha:
          <input
            type="password"
            name="password"
            value={ password }
            onChange={ this.handleChange }
            data-testid="password-input"
            placeholder="Senha"
          />
        </label>
        <Link to="/carteira">
          <button
            type="button"
            disabled={ disabled }
            onClick={ () => dispatchSendEmail(email) }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchSendEmail: (email) => dispatch(userAction(email)),
});

Login.propTypes = {
  dispatchSendEmail: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
