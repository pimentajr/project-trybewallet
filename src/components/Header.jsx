import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { user, wallet } = this.props;
    const { email } = user;
    const { expenses } = wallet;

    const expensesTotal = expenses
      .reduce((accumulator, currentCurrency) => {
        try {
          const { value, currency, exchangeRates } = currentCurrency;
          accumulator += value * exchangeRates[currency].ask;
        } catch (err) {
          console.log(err);
        }
        return accumulator;
      }, 0).toFixed(2);

    return (
      <header className="wallet__header">
        <h2>TrybeWallet</h2>
        <span data-testid="email-field">
          <strong>Email: </strong>
          { email }
        </span>
        <span data-testid="total-field">
          <strong>Despesa Total: R$ </strong>
          { expensesTotal }
        </span>
        <span data-testid="header-currency-field">
          <strong>Moeda: </strong>
          BRL
        </span>
      </header>
    );
  }
}

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  wallet: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.any),
    expenses: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Header);
