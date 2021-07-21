import React, { Component } from 'react';

export default class PaymentMethod extends Component {
  render() {
    return (
      <>
        <option selected value="Dinheiro">Dinheiro</option>
        <option value="Cartão de credito">Cartão de crédito</option>
        <option value="Cartão de debito">Cartão de débito</option>
      </>
    );
  }
}
