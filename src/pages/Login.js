import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentDidUpdate() {
    this.validate();
  }

  validate() {
    const { email, password, isDisabled } = this.state;
    const number = 6;
    const verifyEmail = email.split('').includes('@') && email.split('.').includes('com');
    const verifyPassword = password.length >= number;
    if (verifyEmail && verifyPassword && isDisabled) {
      this.setState({ isDisabled: false });
    } else if ((!verifyEmail || !verifyPassword) && !isDisabled) {
      this.setState({ isDisabled: true });
    }
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { email, password, isDisabled } = this.state;
    const { dispatchLogin } = this.props;

    return (
      <div>
        <input
          data-testid="email-input"
          type="email"
          name="email"
          value={ email }
          onChange={ this.handleChange }
          placeholder="alguem@email.com"
        />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          value={ password }
          onChange={ this.handleChange }
          placeholder="Senha"
        />
        <Link to="/carteira">
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ () => dispatchLogin(email) }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (email) => dispatch(userLogin(email)),
});

Login.propTypes = {
  dispatchLogin: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
