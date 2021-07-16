import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const MIN_PASSWORD_VALID = 6;
function isButtonDisabled(email, password) {
  // expressão regular /[^@](tudo menos o @)+@(segudo de)[^.](tudo menos o .)+\.(o ponto, seguido de)[^.](tudo menos o .)/
  const emailRegex = /[^@]+@[^.]+\.[^.]+/;
  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = password.length >= MIN_PASSWORD_VALID;
  return !isEmailValid || !isPasswordValid;
}

function Login(props) {
  const {
    email,
    password,
    dispatchNewEmail,
    dispatchNewPassword,
  } = props;

  const history = useHistory();
  const changeRoute = () => history.push('/carteira');

  return (
    <div>
      <label htmlFor="email-input">
        Email
        <input
          type="email"
          data-testid="email-input"
          placeholder="Email"
          onChange={ (event) => dispatchNewEmail(event.target.value) }
        />
      </label>
      <br />
      <label htmlFor="password-input">
        Senha
        <input
          type="text"
          data-testid="password-input"
          placeholder="Senha"
          onChange={ (event) => dispatchNewPassword(event.target.value) }
        />
      </label>
      <br />

      <button
        type="submit"
        onClick={ changeRoute }
        disabled={ isButtonDisabled(email, password) }
      >
        Entrar
      </button>
      <h1>{email}</h1>
      <h2>{password}</h2>
    </div>
  );
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  password: state.user.password,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchNewEmail: (email) => dispatch({ type: 'LOGIN_EMAIL', email }),
  dispatchNewPassword: (password) => dispatch({ type: 'LOGIN_PASSWORD', password }),
});

Login.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  dispatchNewEmail: PropTypes.func.isRequired,
  dispatchNewPassword: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
