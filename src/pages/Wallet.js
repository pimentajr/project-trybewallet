import React from 'react';
import { useSelector } from 'react-redux';
import Wrapper from './Wallet.styles';

function Wallet() {
  const userEmail = useSelector((state) => state.user.email);
  return (
    <div>
      <Wrapper>
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
      </Wrapper>
    </div>
  );
}

export default Wallet;
