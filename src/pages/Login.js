import React from 'react';

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <label htmlFor="email">
          <input
            placeholder="Email"
            name="email"
            type="email"
            data-testid="email-input"
          />
        </label>
        <label htmlFor="password">
          <input
            placeholder="Senha"
            name="password"
            type="password"
            data-testid="password-input"
          />
        </label>
        <button type="button">Entrar</button>
      </form>
    </div>
  );
}
