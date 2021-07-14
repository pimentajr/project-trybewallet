import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormDispenses from './FormDispenses';

class Wallet extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.sumExpenses = this.sumExpenses.bind(this);
  // }

  // sumExpenses() {
  //   const { expenses } = this.props;
  //   const totalExpenses = expenses.map(({ currency, value, exchangeRates }) => {
  //     const dayCurrency = exchangeRates[currency];
  //     const sumExpense = Number(value) * Number(dayCurrency.ask);
  //     return sumExpense;
  //   });
  //   return totalExpenses.reduce((total, expense) => total + expense, 0);
  // }

  render() {
    const { email } = this.props;

    return (
      <div>
        <header>
          <div data-testid="email-field">{email}</div>
          <div data-testid="total-field">
            Despesas Totais:
            {/* {this.sumExpenses()} */}
          </div>
          <div data-testid="header-currency-field">BRL</div>
        </header>
        <FormDispenses />
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expense: state.wallet.expense,
});

Wallet.propTypes = {
  email: PropTypes.obj,
  // expenses: PropTypes.arrayOf,
}.isRequired;

export default connect(mapStateToProps)(Wallet);
