import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import FetchedCurrencies from './FetchedCurrencies';

export default class FormsWallet extends Component {
  render() {
    return (
      <form>
        <label htmlFor="input-value">
          Valor
          <input id="input-value" type="text" />
        </label>
        <label htmlFor="description">
          Descrição
          <input id="description" type="text" />
        </label>
        <label htmlFor="currency">
          Moeda
          <select role="combobox" id="currency">
            {/* <FetchedCurrencies /> */}
          </select>
        </label>
      </form>
    );
  }
}
FormsWallet.prototypes = {
  FetchedCurrencies: PropTypes.func.isRequired,
};
