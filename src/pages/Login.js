import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import setUser from '../actions';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      disableEmail: true,
      disablePassword: true,
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  validateEmail(email) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const validEmail = email.match(validRegex)
    if (validEmail !== null) {
      return true;
    }
    return false;
  }

  handleEmail({ target: { value } }) {
    this.setState({ email: value });
    if (this.validateEmail(value)) {
      this.setState({ disableEmail: false });
    } else {
      this.setState({ disableEmail: true });
    }
  }

  handlePassword({ target: { value } }) {
    const numberFive = 5;
    if (value.length > numberFive) {
      this.setState({ disablePassword: false });
    } else {
      this.setState({ disablePassword: true });
    }
  }

  render() {
    const { email, disableEmail, disablePassword } = this.state;
    const { setUserAction } = this.props;
    return (
      <form>
        <label htmlFor="email">
          E-mail
          <input
            data-testid="email-input" 
            type="text"
            name="email"
            onChange={ this.handleEmail }
            value={ email }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            data-testid="password-input" 
            type="password"
            name="password"
            onChange={ this.handlePassword }
          />
        </label>
        <Link
          to="/carteira"
        >
          <button
            type="button"
            onClick={ () => setUserAction(email) }
            disabled={ disableEmail || disablePassword }
          >
            Entrar
          </button>
        </Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setUserAction: (payload) => dispatch(setUser(payload)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = ({
  setUserAction: PropTypes.func.isRequired,
});
