import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    let totalExpenses = 0;
    if (expenses) {
      totalExpenses = expenses.reduce((acc, expense) => acc
      + (expense.value * expense.exchangeRates[expense.currency].ask), 0).toFixed(2);
    }
    return (
      <div>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">
          { totalExpenses }
          <span data-testid="header-currency-field">BRL</span>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.isRequired,
};

export default connect(mapStateToProps)(Header);
