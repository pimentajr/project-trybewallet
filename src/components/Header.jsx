import React, { Component } from 'react';
import store from '../store';

export default class Header extends Component {
  render() {
    const { user, wallet } = store.getState();
    const { email } = user;
    const { expenses } = wallet;

    return (
      <header className="wallet__header">
        <h2>TrybeWallet</h2>
        <span data-testid="email-field">
          <strong>Email:</strong>
          { email }
        </span>
        <span data-testid="total-field">
          <strong>Total:</strong>
          {
            expenses.reduce(() => 0, 0)
          }
        </span>
        <span data-testid="header-currency-field">
          <strong>Moeda:</strong>
          BRL
        </span>
      </header>
    );
  }
}
