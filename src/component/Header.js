import React from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
  const userState = useSelector((state) => state.user);
  const { expenses } = useSelector((state) => state.wallet);

  function sumExpenses() {
    let total = 0;
    expenses.forEach((expense) => {
      total += Number(expense.value) * Number(expense
        .exchangeRates[expense.currency].ask);
    });
    return total.toFixed(2);
  }

  return (
    <header>
      <h2>My Wallet</h2>
      <div>
        <p data-testid="email-field">{ `Bem vindo ${userState.email}` }</p>
        <p data-testid="total-field">{ `Valor: ${sumExpenses()}`}</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    </header>
  );
};

export default Header;
