import React, { Component } from 'react';
import Proptypes from 'prop-types';

export default class Currency extends Component {
  render() {
    const { currency, currencies, handlerChange } = this.props;
    return (
      <label htmlFor="currency">
        Moeda
        <select
          data-testid="currency-input"
          name="currency"
          id="currency"
          value={ currency }
          onChange={ (e) => handlerChange(e) }
        >
          {currencies.map((anyCurr) => (<option key={ anyCurr }>{anyCurr}</option>))}
        </select>
      </label>
    );
  }
}

Currency.propTypes = {
  currency: Proptypes.string.isRequired,
  currencies: Proptypes.arrayOf(Proptypes.string).isRequired,
  handlerChange: Proptypes.func.isRequired,
};
