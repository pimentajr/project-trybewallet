import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, senha } = this.state;
    return (
      <div>
        <form>
          Login
          <input
            onChange={ this.handleChange }
            value={ email }
            type="email"
            name="email"
            data-testid="email-input"
            placeholder="Digite seu email"
          />
          Senha
          <input
            onChange={ this.handleChange }
            value={ senha }
            type="password"
            name="senha"
            data-testid="password-input"
            placeholder="Digite sua senha"
          />
        </form>
        <Link to="/carteira">
          Entrar
        </Link>
      </div>
    );
  }
}

export default Login;
