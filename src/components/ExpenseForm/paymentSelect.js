import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PaymentMethodSelect extends Component {
  render() {
    const { methods, handleChange } = this.props;
    return (
      <label htmlFor="expense-paymentMethod">
        Método de pagamento
        <select
          id="expense-paymentMethod"
          name="method"
          // value={ paymentMethod }
          onChange={ (e) => handleChange(e) }
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
};

export default PaymentMethodSelect;
