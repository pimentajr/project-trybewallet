import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setUser } from '../actions';

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
    const reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const validEmail = email.match(reg);
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
    const { setUserAction, history } = this.props;
    return (
      <form>
        <label
          htmlFor="email"
        >
          <input
            className="container-email-forms"
            data-testid="email-input"
            type="text"
            name="email"
            onChange={ this.handleEmail }
            value={ email }
            placeholder="Email"
          />
        </label>
        <br />
        <label htmlFor="password">
          <input
            className="container-password-forms"
            data-testid="password-input"
            type="password"
            name="password"
            onChange={ this.handlePassword }
            placeholder="Senha"
          />
        </label>
        <br />
        <button
          className="container-button-forms"
          type="button"
          onClick={ () => {
            setUserAction(email);
            history.push('/carteira');
          } }
          disabled={ disableEmail || disablePassword }
        >
          Entrar
        </button>
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
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
});
