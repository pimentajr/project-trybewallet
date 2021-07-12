import React, { Component } from 'react';

class CategoryTagExpense extends Component {
  render() {
    const { tag, funcHandleState } = this.props.myValue;
    return (
      <label htmlFor="tag">
        Tag
        <select id="tag" name="tag" value={ tag } onChange={ funcHandleState }>
          <option name="tag">Alimentação</option>
          <option name="tag">Lazer</option>
          <option name="tag">Trabalho</option>
          <option name="tag">Transporte</option>
          <option name="tag">Saúde</option>
        </select>
      </label>
    );
  }
}

export default CategoryTagExpense;
