import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLogin } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateEmailAndPassword = this.validateEmailAndPassword.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });

    this.validateEmailAndPassword();
  }

  validateEmailAndPassword() {
    const { disabled, email, password } = this.state;
    const minLength = 4;

    if (email.split('').includes('@')
      && email.split('.').includes('com')
      && password.length > minLength
      && disabled) {
      this.setState({ disabled: false });
    }
  }

  render() {
    const { disabled, email, password } = this.state;
    const { enviarEmail } = this.props;
    return (
      <div className="login-container">
        <div className="login-card">
          <h2>TrybeWallet</h2>
          <div className="input-container">
            <label htmlFor="email-input">
              <input
                value={ email }
                name="email"
                data-testid="email-input"
                type="email"
                placeholder="Digite seu email:"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="password-input">
              <input
                value={ password }
                name="password"
                data-testid="password-input"
                type="password"
                placeholder="Digite sua senha:"
                onChange={ this.handleChange }
              />
            </label>
            <Link to="/carteira">
              <button
                type="button"
                disabled={ disabled }
                onClick={ () => enviarEmail(email) }
              >
                Entrar
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  enviarEmail: (payload) => dispatch(userLogin(payload)),
});

Login.propTypes = {
  enviarEmail: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
