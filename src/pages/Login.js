import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidUpdate() {
    this.handleLogin();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleLogin() {
    const { email, password, disabled } = this.state;
    const validação = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const validSenha = 6;
    if (validação.test(email) && password.length >= validSenha && disabled) {
      this.setState({ disabled: false });
    } else if ((!validação.test(email) || !password.length >= validSenha) && !disabled) {
      this.setState({ disabled: true });
    }
  }

  render() {
    const { email, password, disabled } = this.state;
    return (
      <div>
        Login
        <input
          name="email"
          data-testid="email-input"
          placeholder="E-mail"
          value={ email }
          type="email"
          onChange={ this.handleChange }
        />

        <input
          name="password"
          data-testid="password-input"
          placeholder="Senha"
          value={ password }
          type="password"
          minLength="6"
          onChange={ this.handleChange }
        />
        <div>
          <Link to="/carteira">
            <button
              type="button"
              disabled={ disabled }
            // onClick={}
            >
              Entrar
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Login;
