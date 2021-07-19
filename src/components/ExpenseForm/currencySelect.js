import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class CurrencySelect extends Component {
  render() {
    const { currencies } = this.props;
    return (
      <label htmlFor="expense-currency">
        Moeda
        <select id="expense-currency">
          { currencies.map((currency, index) => (
            <option key={ index }>
              {currency}
            </option>))}
        </select>
      </label>
    );
  }
}

CurrencySelect.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(CurrencySelect);
