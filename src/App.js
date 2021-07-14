import React from 'react';

function App() {
  return (
    <div>
      <label htmlFor="email-input">
        <input type="email" data-testid="email-input" />
      </label>
      <label htmlFor="password-input">
        <input type="password" data-testid="password-input" />
      </label>
      <button type="button">Entrar</button>
    </div>
  );
}

export default App;
