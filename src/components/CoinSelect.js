import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi } from '../actions/walletActions';

class CoinSelect extends Component {
  componentDidMount() {
    const { takeCurrencies } = this.props;
    takeCurrencies();
  }

  render() {
    const { currencies, funcHandleChange } = this.props;
    const filtered = Object.keys(currencies).filter((currencie) => currencie !== 'USDT');
    return (
      <label htmlFor="currency">
        Moeda
        <select
          name="currency"
          id="currency"
          onChange={ funcHandleChange }
        >
          { filtered.map((coin, index) => <option key={ index }>{ coin }</option>) }
        </select>
      </label>
    );
  }
}

const mapStateToProps = ({ wallet: { currencies } }) => ({
  currencies,
});

const mapDispatchToProps = (dispatch) => ({
  takeCurrencies: () => dispatch(fetchApi()),
});

CoinSelect.propTypes = {
  takeCurrencies: PropTypes.func,
  currencies: PropTypes.objectOf(),
  currency: PropTypes.number,
  funcHandleChange: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(CoinSelect);
