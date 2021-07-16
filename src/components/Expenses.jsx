import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import store from '../store';

class Expenses extends React.Component {
  constructor() {
    super();
    this.sumExpenses = this.sumExpenses.bind(this);
  }

  sumExpenses() {
    const { expensesTotal } = this.props;
    const infos = expensesTotal.map(({ value, currency, exchangeRates }) => {
      const currencySelect = exchangeRates[currency];
      const priceActual = Number(value) * Number(currencySelect.ask);

      return priceActual;
    });
    return infos.reduce((total, expenses) => {
      total += expenses;
      return total;
    }, 0).toFixed(2);
  }

  render() {
    return (
      <section
        data-testid="total-field"
      >
        Despesas Totais:
        {this.sumExpenses()}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  expensesTotal: state.wallet.expenses,
});

export default connect(mapStateToProps)(Expenses);

Expenses.propTypes = {
  expensesTotal: PropTypes.number,
}.isRequired;
