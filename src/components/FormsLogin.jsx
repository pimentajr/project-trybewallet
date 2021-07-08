import React from 'react';
import { Link } from 'react-router-dom';

class FormsLogin extends React.Component {
  render() {
    const { handleChangeEmail, handleChangePassword, isDisabled } = this.props;

    return (
      <form>
        <input
          data-testid="email-input"
          type="email"
          placeholder="Digite seu e-mail"
          onChange={ handleChangeEmail }
        />
        <input
          data-testid="password-input"
          type="password"
          placeholder="Digite sua Senha"
          onChange={ handleChangePassword }
        />
        <Link to="/carteira">
          <button type="button" disabled={ isDisabled }>Entrar</button>
        </Link>
      </form>
    );
  }
}

export default FormsLogin;
