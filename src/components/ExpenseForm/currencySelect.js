import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const rejectedsCurrencies = ['USDT', 'DOGE'];

class CurrencySelect extends Component {
  render() {
    const { currencies, handleChange, value } = this.props;
    const allowedCurrencies = currencies
      .filter((currency) => !rejectedsCurrencies.includes(currency));
    return (
      <label htmlFor="expense-currency">
        Moeda
        <select
          id="expense-currency"
          data-testid="currency-input"
          name="currency"
          onChange={ (e) => handleChange(e) }
          value={ value }
        >
          { allowedCurrencies.map((currCurrency, index) => (
            <option value={ currCurrency } key={ index }>
              {currCurrency}
            </option>))}
        </select>
      </label>
    );
  }
}

CurrencySelect.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(CurrencySelect);
