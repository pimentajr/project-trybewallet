import React from 'react';
import { useSelector } from 'react-redux';
import Form from '../components/Form';

function Wallet() {
  const userEmail = useSelector((state) => state.user.email);
  return (
    <div>
      <div>
        TrybeWallet
        <div data-testid="email-field">
          Email:
          {userEmail}
        </div>
        <div data-testid="total-field">
          <span>Despesa total: R$ </span>
          0
        </div>
        <div data-testid="header-currency-field">BRL</div>
      </div>
      <Form />
    </div>
  );
}

export default Wallet;
