import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  totalExpenses() {
    const { expenses } = this.props;
    let sum = 0;
    expenses.forEach(({ value, currency, exchangeRates }) => {
      sum += exchangeRates[currency].ask * value;
    });
    return sum.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <div data-testid="email-field">{email}</div>
          <div data-testid="total-field">{this.totalExpenses()}</div>
          <div data-testid="header-currency-field">BRL</div>
        </header>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.number.isRequired,
};
