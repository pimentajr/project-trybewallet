import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PaymentMethodSelect extends Component {
  constructor(props) {
    super();
    const { paymentMethods } = props;
    this.state = ({
      paymentMethod: paymentMethods[0],
    });
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect({ target }) {
    this.setState(() => ({
      paymentMethod: target.value,
    }));
  }

  render() {
    const { paymentMethods } = this.props;
    const { paymentMethod } = this.state;
    return (
      <label htmlFor="expense-paymentMethod">
        Método de pagamento
        <select
          id="expense-paymentMethod"
          value={ paymentMethod }
          onChange={ (e) => this.handleSelect(e) }
        >
          {paymentMethods.map((method, index) => (
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
  paymentMethods: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PaymentMethodSelect;
