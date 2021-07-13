import React from 'react';
import { useSelector } from 'react-redux';

export default function HeaderWallet() {
  const userStore = useSelector((state) => state.user);
  console.log(userStore);

  return (
    <div>
      <div data-testid="email-field">
        Email:
        {userStore.email}
      </div>

      <div data-testid="total-field">
        {/* lÓGICA DE SOMAR DESPESAS */}
        {`Despesa Total: ${0}`}
      </div>

    </div>
  );
}
