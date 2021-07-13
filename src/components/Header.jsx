import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const total = expenses.length === 0
      ? 0
      : expenses.reduce((acc, expense) => {
        const { value, currency, exchangeRates } = expense;

        return acc + parseFloat(value) * exchangeRates[currency].ask;
      }, 0);
    return (
      <header>
        <p data-testid="email-field">
          User:
          { email }
        </p>
        <p data-testid="total-field">
          Cash:
          { total.toFixed(2) }
        </p>
        <p data-testid="header-currency-field"> BRL </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.array,
}.isRequired;
