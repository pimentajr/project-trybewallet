import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class CurrencySelect extends Component {
  render() {
    const { currencies, handleChange } = this.props;
    return (
      <label htmlFor="expense-currency">
        Moeda
        <select
          id="expense-currency"
          name="currency"
          // value={ currency }
          onChange={ (e) => handleChange(e) }
        >
          { currencies.map((currCurrency, index) => (
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
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(CurrencySelect);
