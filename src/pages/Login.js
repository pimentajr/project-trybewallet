import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      Email: '',
      password: '',
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.ableVerification = this.ableVerification.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.ableVerification);
  }

  ableVerification() {
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
            placeholder="Digite seu email"
            name="Email"
            value={ Email }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="password">
          <input
            type="password"
            data-testid="password-input"
            placeholder="Digite sua senha"
            name="password"
            value={ password }
            onChange={ this.handleChange }
          />
        </label>

        <Link to="/carteira">
          <button
            type="button"
            onClick={ () => email(Email) }
            disabled={ disabled }
          >
            ENTRAR
          </button>
        </Link>

      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  email: (payload) => dispatch(saveEmail(payload)),
});

Login.propTypes = {
  saveEmail: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
