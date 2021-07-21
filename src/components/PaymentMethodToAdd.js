import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PaymentMethodToAdd extends Component {
  render() {
    const { handleInfo } = this.props;
    return (
      <label htmlFor="pagamento">
        Método de pagamento
        <select
          id="pagamento"
          name="method"
          onChange={ handleInfo }
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

PaymentMethodToAdd.propTypes = {
  handleInfo: PropTypes.func.isRequired,
};

export default PaymentMethodToAdd;
