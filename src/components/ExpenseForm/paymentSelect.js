import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PaymentMethodSelect extends Component {
  render() {
    const { methods, handleChange, value } = this.props;
    return (
      <label htmlFor="expense-paymentMethod">
        Método de pagamento
        <select
          id="expense-paymentMethod"
          data-testid="method-input"
          name="method"
          onChange={ (e) => handleChange(e) }
          value={ value }
        >
          {methods.map((method, index) => (
            <option value={ method } key={ index }>
              {method}
            </option>
          ))}
        </select>
      </label>
    );
  }
}

PaymentMethodSelect.propTypes = {
  methods: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default PaymentMethodSelect;
