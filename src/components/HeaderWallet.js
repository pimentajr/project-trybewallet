import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class HeaderWallet extends Component {
  constructor() {
    super();
    this.summation = this.summation.bind(this);
  }

  summation() {
    const { expenses } = this.props;
    if (expenses.length > 0) {
      const total = expenses.reduce((acc, crr) => {
        const { ask } = Object.values(crr.exchangeRates)
          .find(({ code }) => code === crr.currency);
        return acc + (crr.value * ask);
      }, 0);
      return total.toFixed(2);
    } return 0;
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <p data-testid="email-field">
          { email }
        </p>
        <p data-testid="total-field">
          { this.summation() }
        </p>
        <p data-testid="header-currency-field">
          BRL
        </p>
      </header>
    );
  }
}

HeaderWallet.propTypes = {
  email: PropTypes.string,
}.required;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(HeaderWallet);
