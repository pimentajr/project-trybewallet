import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { walletCurrencies } from '../actions';

class Header extends Component {
  constructor() {
    super();

    this.firstValuation = this.firstValuation.bind(this);
    this.summering = this.summering.bind(this);
  }

  summering() {
    const { fromWallet, toCurrency } = this.props;
    console.log(fromWallet);
    const total = fromWallet.reduce((acc, exp) => (
      acc + exp.value * exp.exchangeRates[exp.currency].ask), 0);
    toCurrency(total);
  }

  firstValuation() {
    const { fromCurrencies } = this.props;
    this.summering();
    if (fromCurrencies.length === 0) {
      return 0;
    }
    return (parseFloat(fromCurrencies)).toFixed(2);
  }

  render() {
    const { user } = this.props;
    return (
      <div className="headerMain">
        <div>Header</div>
        <div className="headerSec">
          <div data-testid="email-field">{ user }</div>
          <div data-testid="total-field">
            { this.firstValuation() }
          </div>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  fromCurrencies: state.wallet.currencies,
  fromWallet: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  toCurrency: (payload) => dispatch(walletCurrencies(payload)),
});

Header.propTypes = {
  user: PropTypes.string.isRequired,
  fromCurrencies: PropTypes.oneOf(
    PropTypes.number,
  ).isRequired,
  toCurrency: PropTypes.number.isRequired,
  fromWallet: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
