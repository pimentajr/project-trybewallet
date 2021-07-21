import React, { Component } from 'react';

class PaymentMethodToAdd extends Component {
  render() {
    return (
      <label htmlFor="pagamento">
        Método de pagamento
        <select
          id="pagamento"
        >
          <option value="Dinheiro">
            Dinheiro
          </option>
          <option value="Cartão de Crédito">
            Cartão de Crédito
          </option>
          <option value="Cartão de Débito">
            Cartão de Débito
          </option>
        </select>
      </label>
    );
  }
}

export default PaymentMethodToAdd;
