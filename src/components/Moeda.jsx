import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Moeda extends Component {
  render() {
    const { currency, currencies, handleInput } = this.props;
    return (
      <label htmlFor="currency">
        Moeda:
        <select
          data-testid="currency-input"
          id="currency"
          name="currency"
          onChange={ handleInput }
          value={ currency }
        >
          { currencies.map((curr,
            index) => <option key={ index } value={ curr }>{curr}</option>)}
        </select>
      </label>
    );
  }
}

Moeda.propTypes = {
  currency: PropTypes.string,
  handleInput: PropTypes.func,
}.isRequired;
