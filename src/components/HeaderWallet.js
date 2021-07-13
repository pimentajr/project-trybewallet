import React from 'react';

export default function HeaderWallet() {
  return (
    <div>
      <div data-testid="email-field">
        Email:
        {/* TRAZER O STATE USER.EMAIL */}
      </div>

      <div data-testid="total-field">
        {/* lÓGICA DE SOMAR DESPESAS */}
        {`Despesa Total: ${0}`}
      </div>

    </div>
  );
}
