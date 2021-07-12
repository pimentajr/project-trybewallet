import React, { Component } from 'react';

class ExpenseAmount extends Component {
  render() {
    const { value, funcHandleState } = this.props.myValue;
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

export default ExpenseAmount;
