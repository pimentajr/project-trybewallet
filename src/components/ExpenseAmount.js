import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ExpenseAmount extends Component {
  render() {
    const { myValue } = this.props;
    const { value, funcHandleState } = myValue;
    if (value) console.log(typeof(value));
    return (
      <label htmlFor="value">
        Valor
        <input
          name="value"
          type="number"
          id="value"
          value={ value }
          onChange={ funcHandleState }
        />
      </label>
    );
  }
}

ExpenseAmount.propType = {
  myValue: PropTypes.objectOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  funcHandleState: PropTypes.func.isRequired,
};

export default ExpenseAmount;
