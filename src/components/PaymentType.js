import React, { Component } from 'react';

class PaymentType extends Component {
  render() {
    const { method, funcHandleState } = this.props.myValue;
    return (
      <label htmlFor="payment-mode">
        Método de pagamento
        <select
          id="payment-mode"
          name="method"
          value={ method }
          onChange={ funcHandleState }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </label>
    );
  }
}

export default PaymentType;
