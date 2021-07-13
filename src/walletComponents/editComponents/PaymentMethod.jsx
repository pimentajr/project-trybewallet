import React, { Component } from 'react';

export default class PaymentMethod extends Component {
  render() {
    const { method, handleChange } = this.props;
    return (
      <label htmlFor="payment-method">
        Método de pagamento
        <select
          name="method"
          id="payment-method"
          value={ method }
          onChange={ (e) => handleChange(e) }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </label>
    );
  }
}
