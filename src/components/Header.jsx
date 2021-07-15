import React, { Component } from 'react';
import store from '../store';

export default class Header extends Component {
  render() {
    const { user, wallet } = store.getState();
    const { email } = user;
    const { expenses } = wallet;

    const expensesTotal = expenses
      .reduce((accumulator, { value, currency, exchangeRates }) => {
        accumulator += value * exchangeRates[currency].ask;
        return accumulator;
      }, 0).toFixed(2);

    return (
      <header className="wallet__header">
        <h2>TrybeWallet</h2>
        <span data-testid="email-field">
          <strong>Email: </strong>
          { email }
        </span>
        <span data-testid="total-field">
          <strong>Despesa Total: R$ </strong>
          { expensesTotal }
        </span>
        <span data-testid="header-currency-field">
          <strong>Moeda: </strong>
          BRL
        </span>
      </header>
    );
  }
}
