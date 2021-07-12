import React, { Component } from 'react';

class ExpenseDescription extends Component {
  render() {
    const { description, funcHandleState } = this.props.myValue;
    return (
      <label htmlFor="description">
        Descrição
        <input
          name="description"
          type="text"
          id="description"
          value={ description }
          onChange={ funcHandleState }
        />
      </label>
    );
  }
}

export default ExpenseDescription;
