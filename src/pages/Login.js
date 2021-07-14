import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();

  function checkEmail(e, p) {
    const validEmail = /^[a-zA-Z]+@[a-zA-Z]+\.[com]{3,}$/i;
    const passLength = 6;
    return validEmail.test(e) && p.length >= passLength;
  }

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
      <button
        type="button"
        disabled={ email && pass ? !checkEmail(email, pass) : true }
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
