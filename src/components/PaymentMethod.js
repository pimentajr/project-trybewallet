import React, { Component } from 'react';

export default class PaymentMethod extends Component {
  render() {
    return (
      <>
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </>
    );
  }
}
