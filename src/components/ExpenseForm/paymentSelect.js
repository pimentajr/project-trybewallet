import React, { Component } from 'react';

class PaymentMethodSelect extends Component {
  render() {
    return (
      <label htmlFor="paymentMethod">
        Método de pagamento
        <select name="paymentMethod">
          <option>
            Dinheiro
          </option>
          <option>
            Cartão de crédito
          </option>
          <option>
            Cartão de débito
          </option>
        </select>
      </label>
    );
  }
}

export default PaymentMethodSelect;
