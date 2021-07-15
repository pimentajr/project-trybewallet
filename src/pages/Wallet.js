import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormDispenses from './FormDispenses';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.sumExpenses = this.sumExpenses.bind(this);
  }

  sumExpenses() {
    const { expense } = this.props;
    console.log(expense);
    const totalExpenses = expense.map(({ currency, value, exchangeRates }) => {
      const dayCurrency = exchangeRates[currency];
      const sumExpense = Number(value) * Number(dayCurrency.ask);
      return sumExpense;
    });
    console.log(totalExpenses);
    return totalExpenses.reduce((total, expenses) => total + expenses, 0).toFixed(2);
  }

  render() {
    const { email } = this.props;

    return (
      <div>
        <header className="header">
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">
            Despesas Totais: R$ 0,00
            {/* { this.sumExpenses() } */}
          </p>
          <p data-testid="header-currency-field">BRL</p>
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
  email: PropTypes.objectOf,
  expense: PropTypes.objectOf,
}.isRequired;

export default connect(mapStateToProps)(Wallet);
