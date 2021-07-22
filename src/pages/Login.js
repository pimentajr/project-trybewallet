import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getLogin } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      senha: '',
      login: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  validateEmail(email) {
    const RegExp = /^\S+@\S+\.\S+$/;
    return RegExp.test(String(email).toLowerCase());
  }

  validate() {
    const { email, senha } = this.state;
    const minLenght = 6;
    if (this.validateEmail(email) && senha.length >= minLenght) {
      return true;
    }
    return false;
  }

  login() {
    const { email } = this.state;
    const { login } = this.props;
    if (this.validate()) {
      login(email);
      this.setState({
        login: true,
      });
    }
  }

  render() {
    const { email, senha, login } = this.state;
    const logar = this.validate();

    if (login) return <Redirect to="/carteira" />;

    return (
      <div>
        <form>
          <label htmlFor="login">
            Login
            <input
              value={ email }
              type="email"
              name="email"
              data-testid="email-input"
              placeholder="Digite seu email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="senha">
            Senha
            <input
              value={ senha }
              type="password"
              name="senha"
              data-testid="password-input"
              placeholder="Digite sua senha"
              onChange={ this.handleChange }
            />
          </label>
        </form>
        <button
          type="button"
          disabled={ !logar }
          onClick={ this.loginOn }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(getLogin(email)) });

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  login: PropTypes.func,
}.isRequierd;
