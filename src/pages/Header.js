import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  getTotal() {
    const { expenses } = this.props;
    let total = 0;
    expenses.forEach(({ value, currency, exchangeRates }) => {
      total += exchangeRates[currency].ask * value;
    });
    return total.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <h1 data-testid="email-field">{ email }</h1>
        <p data-testid="total-field">{ this.getTotal()}</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
