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
    const { expenses } = this.props; // pegando o array de objetos salvo no redux

    const totalExpenses = expenses.map(({ currency, value, exchangeRates }) => {
      const atualCurrency = exchangeRates[currency]; // pego a moeda atual
      const sumExpense = Number(value) * Number(atualCurrency.ask); // multiplicar a cotação atual pelo valor da moeda atual
      return sumExpense;
    });
    console.log(totalExpenses); // retorna despesa já com a cotação atual
    return totalExpenses.reduce((total, expense) => total + expense, 0).toFixed(2); // Conforme for salvando no redux, vou somar automaticamente
  }

  render() {
    const { email } = this.props;

    return (
      <div>
        <header className="header">
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">
            Despesas Totais:
            R$
            { ' ' }
            { this.sumExpenses() }
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
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  email: PropTypes.objectOf,
  expenses: PropTypes.objectOf,
}.isRequired;

export default connect(mapStateToProps)(Wallet);
