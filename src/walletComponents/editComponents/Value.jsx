import React, { Component } from 'react';

export default class Value extends Component {
  render() {
    const { value, handlerChange } = this.props;
    return (
      <label htmlFor="expenses">
        Valor
        <input
          name="value"
          id="expenses"
          type="number"
          value={ value }
          onChange={ (e) => handlerChange(e) }
        />
      </label>
    );
  }
}
