import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: false,
      disabled: false,
    };
    this.handleCInputEmail = this.handleCInputEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handlePassword({ target: { value } }) {
    const min = 6;
    this.setState({ disabled: value.length >= min });
  }

  handleCInputEmail({ target: { value } }) {
    this.setState({
      email: value,
    });
    this.setState({ password: value.match(/[a-z]+@[a-z]+.com/g) });
  }

  render() {
    const { keyEmail } = this.props;
    const { password, disabled, email } = this.state;
    const permit = password && disabled;
    return (
      <div>
        <h2> Login TrybeWallet </h2>
        <br />
        <label htmlFor="email-input">
          Email:
          {/* {' '} */}
          <input
            type="email"
            name="email"
            data-testid="email-input"
            onChange={ this.handleCInputEmail }
          />
        </label>
        <br />
        <label htmlFor="email-input">
          Senha:
          {/* {' '} */}
          <input
            type="password"
            name="password"
            data-testid="password-input"
            onChange={ this.handlePassword }
          />
        </label>
        <Link to="/carteira">
          <button
            type="button"
            disabled={ !permit }
            onClick={ () => keyEmail(email) }
          >
            Entrar
          </button>
        </Link>
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  gEmail: (email) => dispatch(getEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  gEmail: PropTypes.func,
}.isRequired;
