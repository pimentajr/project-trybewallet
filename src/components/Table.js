import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as action from '../actions';

const tableTitles = [
  'Descrição',
  'Tag',
  'Método de pagamento',
  'Valor',
  'Moeda',
  'Câmbio utilizado',
  'Valor convertido',
  'Moeda de conversão',
  'Editar/Excluir',
];

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.currencyName = this.currencyName.bind(this);
    this.currencyAsk = this.currencyAsk.bind(this);
    this.btnDelete = this.btnDelete.bind(this);
    this.sumExpenses = this.sumExpenses.bind(this);
  }

  currencyName({ currency, exchangeRates }) {
    return Object.values(exchangeRates)
      .find((currencie) => currencie.code === currency).name;
  }

  currencyAsk({ currency, exchangeRates }) {
    const ask = Object.values(exchangeRates)
      .find(({ code }) => code === currency);
    return Number(ask.ask).toFixed(2);
  }

  currencyValueConverted({ currency, exchangeRates, value }) {
    const ask = Object.values(exchangeRates)
      .find(({ code }) => code === currency);
    return Number(ask.ask * value).toFixed(2);
  }

  sumExpenses(otherExpenses) {
    const { expensesDelete } = this.props;
    const total = 0;
    const result = (otherExpenses.length > 0)
      ? otherExpenses.reduce((acc, cur) => (
        acc + (cur.value * cur.exchangeRates[cur.currency].ask)), 0)
      : total;

    expensesDelete(otherExpenses, result);
  }

  btnDelete(id) {
    const { expenses } = this.props;
    const otherExpenses = expenses.filter((expency) => expency.id !== id);
    this.sumExpenses(otherExpenses);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            {tableTitles.map((title, index) => <th key={ index }>{title}</th>)}
          </tr>
        </thead>
        <tbody>
          {expenses
            .map((expency) => (
              <tr key={ expency.id }>
                <td>{expency.description}</td>
                <td>{expency.tag}</td>
                <td>{expency.method}</td>
                <td>{expency.value}</td>
                <td>{this.currencyName(expency)}</td>
                <td>{this.currencyAsk(expency)}</td>
                <td>{this.currencyValueConverted(expency)}</td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => this.btnDelete(expency.id) }
                  >
                    x
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  expensesDelete: (expenses, total) => dispatch(action.expensesDelete(expenses, total)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  expensesDelete: PropTypes.func.isRequired,
};
