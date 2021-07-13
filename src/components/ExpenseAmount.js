import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ExpenseAmount extends Component {
  render() {
    const { myValue } = this.props;
    const { value, funcHandleState } = myValue;
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

ExpenseAmount.propTypes = {
  myValue: PropTypes.shape.isRequired,
  value: PropTypes.string.isRequired,
  funcHandleState: PropTypes.func.isRequired,
};

export default ExpenseAmount;
