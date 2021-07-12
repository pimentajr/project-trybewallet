import React, { Component } from 'react';

export default class Payment extends Component {
  render() {
    return (
      <label htmlFor="payment">
        Método de pagamento:
        <select id="payment">
          <option value="money">Dinheiro</option>
          <option value="credit">Cartão de crédito</option>
          <option value="debit">Cartão de débito</option>
        </select>
      </label>
    );
  }
}
