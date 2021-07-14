import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userData } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  componentDidUpdate() {
    this.handleCheck();
  }

  handleCheck() {
    const { email, password, disabled } = this.state;
    const num = 6;
    const emailCheck = email.split('').includes('@') && email.split('.').includes('com');
    const passwordCheck = password.length >= num;
    if (emailCheck && passwordCheck && disabled) {
      this.setState({
        disabled: false,
      });
    } else if ((!emailCheck || !passwordCheck) && !disabled) {
      this.setState({
        disabled: true,
      });
    }
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, password, disabled } = this.state;
    const { dispatchEmail } = this.props;
    return (
      <form>
        <label htmlFor="email">
          <input
            name="email"
            type="email"
            value={ email }
            onChange={ this.handleChange }
            data-testid="email-input"
          />
        </label>
        <label htmlFor="password">
          <input
            name="password"
            minLength="6"
            value={ password }
            onChange={ this.handleChange }
            data-testid="password-input"
          />
        </label>
        <Link to="/carteira">
          <button
            disabled={ disabled }
            type="submit"
            onClick={ () => dispatchEmail(email) }
          >
            Entrar
          </button>
        </Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (email) => dispatch(userData(email)),
});

Login.propTypes = {
  dispatchEmail: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
