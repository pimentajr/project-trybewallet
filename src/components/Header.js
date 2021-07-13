import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { emailState, expenses } = this.props;
    const total = expenses.reduce((acc, { exchangeRates, value, currency }) => (
      acc + (Number(exchangeRates[currency].ask * value))), 0);
    return (
      <header>
        <div>Hello, TrybeWallet!</div>
        <h2 data-testid="email-field">{ emailState }</h2>
        <div>
          Despesa Total: R$
          <span data-testid="total-field">
            { total || 0 }
          </span>
          <span data-testid="header-currency-field"> BRL </span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  emailState: state.user.email,
  expenses: state.wallet.expenses,
  currency: state.wallet.currencies,
});

Header.propTypes = {
  emailState: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Header);
