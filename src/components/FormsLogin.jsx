import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { emailAssignment } from '../actions';

class FormsLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      isEmailValid: false,
      isPasswordValid: false,
    };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleChangeEmail({ target: { value } }) {
    const email = value;
    const regTest = /[a-zA-Z0-9]+[.]?([a-zA-Z0-9]+)?[@][a-z]{3,9}[.][a-z]{2,5}/g;
    const resultTest = regTest.test(email);

    this.setState({
      email,
      isEmailValid: resultTest,
    });
  }

  handleChangePassword({ target: { value } }) {
    const password = value;
    const passwordMinLength = 6;

    if (password.length >= passwordMinLength) {
      this.setState({ isPasswordValid: true });
    } else {
      this.setState({ isPasswordValid: false });
    }
  }

  render() {
    const { setEmail } = this.props;
    const { email, isEmailValid, isPasswordValid } = this.state;
    const isDisabled = !(isEmailValid && isPasswordValid);
    return (
      <form>
        <input
          data-testid="email-input"
          type="email"
          placeholder="Digite seu e-mail"
          onChange={ this.handleChangeEmail }
        />
        <input
          data-testid="password-input"
          type="password"
          placeholder="Digite sua Senha"
          onChange={ this.handleChangePassword }
        />
        <Link to="/carteira">
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ () => setEmail(email) }
          >
            Entrar
          </button>
        </Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setEmail: (email) => dispatch(emailAssignment(email)),
});

export default connect(null, mapDispatchToProps)(FormsLogin);

FormsLogin.propTypes = {
  setEmail: PropTypes.func.isRequired,
};
