import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleLogin() {
    const { email, password } = this.state;
    const validacao = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const magicNumber = 6;
    if (validacao.test(email) && password.length >= magicNumber) {
      return false;
    }
    return true;
  }

  render() {
    const { email, password } = this.state;
    const { loginAction, history } = this.props;
    return (
      <form>
        <input
          data-testid="email-input"
          name="email"
          value={ email }
          type="email"
          placeholder="Email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          title="email inválido"
          onChange={ this.handleChange }
        />
        <input
          data-testid="password-input"
          name="password"
          value={ password }
          type="password"
          placeholder="Senha"
          pattern=".{6,}"
          title="senha inválida"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          disabled={ this.handleLogin() }
          onClick={ () => {
            loginAction(email);
            history.push('/carteira');
          } }
        >
          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginAction: (value) => dispatch(login(value)),
});

Login.propTypes = ({
  loginAction: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}).isRequired;

export default connect(null, mapDispatchToProps)(Login);
