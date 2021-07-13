import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { emailLogin } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  validEmail() {
    const { email, password } = this.state;
    const validEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const pass = 6;
    if (validEmail.test(email) && password.length === pass) {
      return false;
    }
    return true;
  }

  render() {
    const { email, password } = this.state;
    const { fazerLogin } = this.props;
    return (
      <form className="form-login">
        <label htmlFor="email">
          Email:
          <input
            data-testid="email-input"
            className="email-input"
            placeholder="Email"
            type="text"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            data-testid="password-input"
            className="password-input"
            placeholder="Password"
            type="text"
            name="password"
            value={ password }
            onChange={ this.handleChange }
          />
        </label>

        <Link to={ { pathname: 'carteira' } }>
          <button
            type="button"
            disabled={ this.validEmail() }
            onClick={ () => fazerLogin({ email }) }
          >
            Entrar
          </button>
        </Link>
      </form>
    );
  }
}

Login.propTypes = {
  fazerLogin: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  fazerLogin: (email) => dispatch(emailLogin(email)),
});

export default connect(null, mapDispatchToProps)(Login);
