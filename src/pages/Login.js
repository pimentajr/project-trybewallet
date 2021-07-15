import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import storeUserEmail from '../actions';

function Login() {
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();

  function checkEmailAndPass(e, p) {
    const validEmail = /^[a-zA-Z]+@[a-zA-Z]+\.[com]{3,}$/i;
    const passLength = 6;
    return validEmail.test(e) && p.length >= passLength;
  }

  const dispatch = useDispatch();

  return (
    <div>
      <label htmlFor="email-input">
        <input
          value={ email }
          type="email"
          data-testid="email-input"
          required
          onChange={ (e) => setEmail(e.target.value) }
        />
      </label>
      <label htmlFor="password-input">
        <input
          value={ pass }
          type="password"
          data-testid="password-input"
          required
          onChange={ (e) => setPass(e.target.value) }
        />
      </label>
      <Link to="/carteira">
        <button
          type="button"
          disabled={ email && pass ? !checkEmailAndPass(email, pass) : true }
          onClick={ () => dispatch(storeUserEmail(email, true)) }
        >
          Entrar
        </button>
      </Link>
    </div>
  );
}

export default Login;
