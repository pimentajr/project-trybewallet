import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Payment extends Component {
  render() {
    const { handleChange, method } = this.props;
    return (
      <label htmlFor="method">
        Método de pagamento:
        <select
          data-testid="method-input"
          name="method"
          id="method"
          onChange={ handleChange }
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

Payment.propTypes = {
  handleChange: PropTypes.func.isRequired,
  method: PropTypes.string.isRequired,
};

export default Payment;
