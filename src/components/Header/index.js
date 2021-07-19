import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  calculateTotalExpenses(expenses) {
    return expenses
      .reduce((acc,
        cv) => Number(acc) + Number(cv.value * cv.exchangeRates[cv.currency].ask),
      0).toFixed(2);
  }

  render() {
    const { userEmail, expenses } = this.props;
    const totalExpense = expenses.length > 0
      ? this.calculateTotalExpenses(expenses) : 0;
    return (
      <header>
        <span
          data-testid="email-field"
        >
          { `Email: ${userEmail}` }
        </span>
        <p>
          Despesa Total: R$
          <span
            data-testid="total-field"
          >
            { totalExpense }
          </span>
          <span
            data-testid="header-currency-field"
          >
            BRL
          </span>
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);
