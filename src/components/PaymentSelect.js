import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PaymentSelect extends Component {
  render() {
    const { funcHandleChange } = this.props;
    return (
      <label htmlFor="method">
        Método de pagamento
        <select name="method" id="method" onChange={ funcHandleChange }>
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

PaymentSelect.propTypes = {
  funcHandleChange: PropTypes.func,
}.isRequired;
