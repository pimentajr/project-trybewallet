import React from 'react';
import '../styles/Login.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as userActions from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disabledButton: true,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  // Função que torna o input dinâmico ao state.
  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.LoginVerification());
  }

  /* Função que verifica se a senha possui ao menos 6 caracteres, e
     a estrutura de um email. */
  LoginVerification() {
    const { email, password } = this.state;
    const minimumLength = 6;
    if (email.includes('@' && '.com') && password.length >= minimumLength) {
      this.setState({
        disabledButton: false,
      });
    }
  }

  renderEmailInput() {
    const { email } = this.state;
    return (
      <label
        htmlFor="input-email"
      >
        Email:
        <input
          type="email"
          name="email"
          data-testid="email-input"
          value={ email }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  render() {
    const { emailInput } = this.props;
    const { email, password, disabledButton } = this.state;
    return (
      <form>
        <h1 className="title">
          TrybeWallet
          <span role="img" aria-label="Money">💸</span>
        </h1>

        {this.renderEmailInput()}

        <label
          htmlFor="input-password"
        >
          Senha:
          <input
            type="password"
            name="password"
            value={ password }
            data-testid="password-input"
            onChange={ this.handleChange }
          />
        </label>

        <Link
          to="/carteira"
        >
          <button
            className="login-button"
            type="submit"
            disabled={ disabledButton }
            onClick={ () => emailInput(email) }
          >
            Entrar
          </button>
        </Link>
      </form>
      // Esse botão está disparando o mapDispatchToProps e enviando o valor para a store.
    );
  }
}

// Esta função é responsável por capturar o state do email digitado e colocar na prop emailInput, que será levada para a store.
const mapDispatchToProps = (dispatch) => ({
  emailInput: (state) => dispatch(userActions.getEmail(state)),
});

Login.propTypes = {
  emailInput: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
