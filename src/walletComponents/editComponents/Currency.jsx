import React, { Component } from 'react';

export default class Currency extends Component {
  render() {
    const { currency, currencies, handleChange } = this.props;
    return (
      <label htmlFor="currency">
        Moeda
        <select
          name="currency"
          id="currency"
          value={ currency }
          onChange={ (e) => handleChange(e) }
        >
          {currencies.map((anyCurr) => (<option key={anyCurr}>{anyCurr}</option>))}
        </select>
      </label>
    );
  }
}
