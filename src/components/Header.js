import React from 'react';
import { useSelector } from 'react-redux';
import './header.css';

function Header() {
  // usei react hooks redux
  const email = useSelector((state) => state.user.email);
  const expenses = useSelector((state) => state.wallet.expenses);
  console.log(expenses);
  const expensesTotal = expenses
    .map((item) => Number(item.exchangeRates[item.currency].ask) * Number(item.value));
  console.log(expensesTotal);
  return (
    <header>
      <div>
        <span data-testid="email-field">{ email }</span>
      </div>
      <div>
        <span>Total de gastos: </span>
        <span data-testid="total-field">
          { expensesTotal.reduce((acc, current) => {
            acc += current;
            return acc;
          }, 0) }
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    </header>
  );
}

export default Header;
