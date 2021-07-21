import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies } from '../actions';

class CurrencieToAdd extends Component {
  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  render() {
    const { currencies, handleInfo } = this.props;
    return (
      <label htmlFor="moeda">
        Moeda
        <select
          id="moeda"
          name="currency"
          onChange={ handleInfo }
        >
          {
            currencies.map((currencie) => (
              <option
                key={ currencie }
              >
                { currencie }
              </option>
            ))
          }
        </select>
      </label>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(getCurrencies()),
});

CurrencieToAdd.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.any).isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  handleInfo: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencieToAdd);
