import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PaymentMethod extends Component {
  render() {
    const { method, handlerChange } = this.props;
    return (
      <label htmlFor="payment-method">
        Método de pagamento
        <select
          name="method"
          id="payment-method"
          value={ method }
          onChange={ (e) => handlerChange(e) }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </label>
    );
  }
}

PaymentMethod.propTypes = {
  method: PropTypes.string.isRequired,
  handlerChange: PropTypes.func.isRequired,
};
