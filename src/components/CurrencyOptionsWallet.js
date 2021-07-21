/* import React from 'react';
import PropTypes from 'prop-types';

export default function CurrencyOptionsWallet({ currencies }) {
  const currencyOptions = Object.keys(currencies);
  const currencyFilter = currencyOptions.filter((key) => key !== 'USDT');
  return (
    <>
      { currencyFilter.map((key) => (
        <option key={ key } value={ key }>
          { key }
        </option>))}
    </>
  );
}

CurrencyOptionsWallet.propTypes = {
  currencies: PropTypes.arrayOf().isRequired,
};
 */
