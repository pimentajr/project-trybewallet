import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setEmail } from '../actions';
// import * as user from '../reducers/user';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.isDisable = this.isDisable.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  validadeEmail(email) {
    const parseEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; // regex para validar email. url: https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    return parseEmail.test(email); // RegExp.prototype.test() -> O método test() executa uma busca por uma correspondência entre  uma expressão regular e uma string. Retorna true ou false. url: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
  }

  validadePassword(password) {
    const minOfCaracteres = 6;
    return (password.length >= minOfCaracteres);
  }

  isDisable() {
    const { email, password } = this.state;
    const btnLogin = document.querySelectorAll('.btn-login')[0];
    if (this.validadeEmail(email) && this.validadePassword(password)) {
      btnLogin.disabled = false;
    } else {
      btnLogin.disabled = true;
    }
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.isDisable());
  }

  submitLogin(event) {
    event.preventDefault();
    const { setEmailAction } = this.props;
    const { email } = this.state;
    setEmailAction(email);
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="email-id">
            Email:
            <input
              value={ email }
              id="email-id"
              name="email"
              type="email"
              data-testid="email-input"
              className="email"
              placeholder="Digite seu email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password-id">
            Password:
            <input
              id="password-id"
              name="password"
              type="password"
              data-testid="password-input"
              className="password"
              value={ password }
              placeholder="Digite sua senha"
              onChange={ this.handleChange }
            />
          </label>
          <Link to="/carteira">
            <button
              type="submit"
              className="btn-login"
              onSubmit={ (e) => this.submitLogin(e) }
              disabled
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   username: state.user.email,
// });

const mapDispatchToProps = (dispatch) => ({
  setEmailAction: (payload) => dispatch(setEmail(payload)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  setEmailAction: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
