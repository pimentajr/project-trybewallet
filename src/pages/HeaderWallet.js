import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class HeaderWallet extends Component {
  render() {
    const { email, expenses } = this.props;
    const sum = expenses.length === 0 ? 0
      : expenses.reduce((acc, expense) => {
        const { value, currency, exchangeRates } = expense;
        return acc + parseFloat(value) * exchangeRates[currency].ask;
      }, 0);
    return (
      <header>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">{sum.toFixed(2)}</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

HeaderWallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(HeaderWallet);
