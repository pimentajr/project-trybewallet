import React from 'react';
import PropTypes from 'prop-types';

function Form({ handleSubmit, handleChange, inputForm }) {
  return (
    <section>
      <form className="login-form" onSubmit={ handleSubmit }>
        <input
          data-testid="email-input"
          name="email"
          type="email"
          onChange={ handleChange }
          value={ inputForm.email }
          required
        />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          onChange={ handleChange }
          value={ inputForm.password }
          required
          pattern=".{6,}"
          title="A senha minima deve ter pelo menos 6 caracteres"
        />
        <button className="submit-button" disabled type="submit">
          Entrar
        </button>
      </form>
    </section>
  );
}

export default Form;

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  inputForm: PropTypes.shape({
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};
