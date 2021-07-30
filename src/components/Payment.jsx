import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Payment extends Component {
  render() {
    const paymentMethod = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
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
          {paymentMethod.map((payment, index) => (
            <option key={ index } value={ payment }>
              { payment }
            </option>
          ))}
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
