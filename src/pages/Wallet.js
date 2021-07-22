import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddExpense from '../components/AddExpense';
import ExpensesTable from '../components/ExpensesTable';

class Wallet extends React.Component {
  render() {
    const { email, expenses } = this.props;
    let totalExpensesValue = 0;
    if (expenses.length > 0) {
      expenses.forEach((expense) => {
        if (expense.exchangeRates.USD !== undefined) {
          const { value } = expense;
          const positionOfTargetExchange = expense.currency;
          const rate = expense.exchangeRates[positionOfTargetExchange].ask;
          totalExpensesValue += (parseInt(rate, 10) * parseInt(value, 10)).toFixed(2);
        }
      });
    }
    return (
      <div>
        <header
          data-testid="email-field"
        >
          { email }
        </header>
        <div
          data-testid="total-field"
        >
          { totalExpensesValue }
        </div>
        <div
          data-testid="header-currency-field"
        >
          BRL
        </div>
        <AddExpense />
        <ExpensesTable />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Wallet);
