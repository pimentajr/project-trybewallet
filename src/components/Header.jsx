import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  totalCurrency() {
    const { totalExpenses } = this.props;
    let soma = 0;
    totalExpenses.forEach(({ value, currency, exchangeRates }) => {
      soma += exchangeRates[currency].ask * value;
    });
    return soma.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <div data-testid="email-field">{email}</div>
        <div data-testid="total-field">{this.totalCurrency()}</div>
        <div data-testid="header-currency-field">BRL</div>
      </header>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalExpenses: PropTypes.number.isRequired,
};
