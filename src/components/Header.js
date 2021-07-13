import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { walletCurrencies } from '../actions';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      accuValue: 0,
    };

    this.firstValuation = this.firstValuation.bind(this);
  }

  firstValuation() {
    const { fromCurrencies, toCurrency } = this.props;
    const { accuValue } = this.state;
    if (fromCurrencies.length === 0) {
      toCurrency(accuValue);
      return 0;
    }
    return (parseFloat(fromCurrencies));
  }

  render() {
    const { user } = this.props;
    return (
      <div className="headerMain">
        <div>Header</div>
        <div className="headerSec">
          <div data-testid="email-field">{ user }</div>
          <p data-testid="total-field" className="headerSec">
            Despesas totais:
            { this.firstValuation() }
            <div data-testid="header-currency-field">BRL</div>
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  fromCurrencies: state.wallet.currencies,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
