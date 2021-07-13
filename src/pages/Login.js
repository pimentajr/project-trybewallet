import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { logEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      buttonDisabled: true,
      isLogado: false,
    };
    this.validateLogin = this.validateLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    const { fazerLogin } = this.props;
    const { email } = this.state;
    fazerLogin(email);
    this.setState({
      isLogado: true,
    });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validateLogin());
  }

  validateLogin() {
    const { email, password } = this.state;
    const len = 6;
    const pass = password.length;
    const reg = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (reg.test(email) && pass >= len) {
      this.setState({
        buttonDisabled: false,
      });
    } else {
      this.setState({
        buttonDisabled: true,
      });
    }
  }

  render() {
    const { buttonDisabled, isLogado } = this.state;
    if (isLogado === true) {
      return <Redirect to="/carteira" />;
    }
    return (
      <div>
        <h2>Tela de Login</h2>
        <h4>Digite seu Email e senha</h4>
        <input
          onChange={ this.handleChange }
          name="email"
          type="text"
          data-testid="email-input"
          placeholder="Email"
        />

        <input
          onChange={ this.handleChange }
          name="password"
          type="password"
          data-testid="password-input"
          placeholder="Senha"
        />
        <button
          onClick={ this.handleLogin }
          type="button"
          disabled={ buttonDisabled }
        >
          Entrar
        </button>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  fazerLogin: (email) => dispatch(logEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  fazerLogin: PropTypes.func.isRequired,
};
