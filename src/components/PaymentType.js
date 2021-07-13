import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PaymentType extends Component {
  render() {
    const { myValue } = this.props;
    const { method, funcHandleState } = myValue;
    return (
      <label htmlFor="payment-mode">
        Método de pagamento
        <select
          id="payment-mode"
          name="method"
          onChange={ funcHandleState }
          value={ method }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }
}

PaymentType.propTypes = {
  myValue: PropTypes.shape.isRequired,
  method: PropTypes.string.isRequired,
  funcHandleState: PropTypes.func.isRequired,
};

export default PaymentType;
