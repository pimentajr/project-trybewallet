import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import userEmail from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabled: true,
      isValidUser: false,
    };

    this.handleInput = this.handleInput.bind(this);
    this.validateUserCredentials = this.validateUserCredentials.bind(this);
  }

  handleInput(e) {
    const { type, value } = e.target;
    this.setState(() => ({ [type]: value }));
    this.validateUserCredentials();
  }

  validateUserCredentials() {
    const { email, password } = this.state;
    const emailPattern = /[a-z]+@[a-z]+\.com/;
    const MinPasswordLength = 5;
    const isAllValid = emailPattern.test(email) && password.length >= MinPasswordLength;
    this.setState({ disabled: !isAllValid });
  }

  redirectUser() {
    this.setState({ isValidUser: true });
  }

  render() {
    const { email, disabled, isValidUser } = this.state;
    const { storeUserEmail } = this.props;

    if (isValidUser) {
      // Usuário válido: armazena o email no state global
      // e redireciona o usuário para a página da carteira
      storeUserEmail(email);
      return <Redirect to="/carteira" />;
    }

    return (
      <div>
        <form action="">
          <label htmlFor="email-input">
            Email:
            <input
              onChange={ (e) => this.handleInput(e) }
              data-testid="email-input"
              type="email"
            />
          </label>
          <label htmlFor="password-input">
            Senha:
            <input
              onChange={ (e) => this.handleInput(e) }
              data-testid="password-input"
              type="password"
            />
          </label>
          <button
            onClick={ () => this.redirectUser() }
            disabled={ disabled }
            type="button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  storeUserEmail: (email) => dispatch(userEmail(email)),
});

Login.propTypes = {
  storeUserEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
