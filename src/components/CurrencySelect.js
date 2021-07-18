import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class CurrencySelect extends React.Component {
  componentDidMount() {
    const { loadCurrencies } = this.props;
    loadCurrencies();
  }

  render() {
    const { currencies } = this.props;

    return (
      <label htmlFor="currency">
        Moeda
        <select id="currency" name="moeda">
          {currencies.map((item) => (
            <option key={item.code} value={item.code}>
              {item.code}
            </option>
          ))}
        </select>
      </label>
    );
  }
}

function loadCurrenciesThunk() {
  return (dispatch) => {
    return fetch("https://economia.awesomeapi.com.br/json/all")
      .then((res) => res.json())
      .then((rawCurrencies) => {
        return Object.entries(rawCurrencies)
          .filter((item) => item[0] !== "USDT")
          .map((item) => item[1]);
      })
      .then((filteredCurrencies) => {
        dispatch({
          type: "WALLET_SET_CURRENCIES",
          payload: filteredCurrencies,
        });
      });
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadCurrencies: () => dispatch(loadCurrenciesThunk()),
  };
}

function mapStateToProps(state) {
  return {
    currencies: state.wallet.currencies,
  };
}

CurrencySelect.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadCurrencies: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySelect);
