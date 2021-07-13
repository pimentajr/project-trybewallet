import React from 'react';
import PropTypes from 'prop-types';

export default function LoginForm(props) {
  const { handleChange, handleSubmit, handleDisabled } = props;
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={ (event) => handleSubmit(event) }>
        <label htmlFor="email">
          <input
            placeholder="Email"
            name="email"
            type="email"
            data-testid="email-input"
            onChange={ (event) => handleChange(event) }
          />
        </label>
        <label htmlFor="password">
          <input
            placeholder="Senha"
            name="password"
            type="password"
            data-testid="password-input"
            onChange={ (event) => handleChange(event) }
          />
        </label>
        <button
          type="submit"
          disabled={ handleDisabled() }
        >
          Entrar
        </button>
      </form>
    </div>

  );
}

LoginForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleDisabled: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
