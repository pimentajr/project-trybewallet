import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense } from '../actions';

class ExpenseTable extends React.Component {
  constructor() {
    super();

    this.renderInfo = this.renderInfo.bind(this);
  }

  renderInfo() {
    const { expenses, removeExpenses } = this.props;

    if (expenses.length > 0) {
      const expenseTable = expenses.map((expense, index) => {
        const currencyER = expense.exchangeRates[expense.currency];
        const ask = parseFloat(currencyER.ask);
        const currency = currencyER.name.split('/')[0];
        const total = expense.value * ask;

        return (
          <tbody key={ index }>
            <tr>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{expense.value}</td>
              <td>{currency === 'Dólar Americano' ? 'Dólar Comercial' : currency}</td>
              <td>{ask.toFixed(2)}</td>
              <td>{total.toFixed(2)}</td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => removeExpenses(expense) }
                >
                  Apagar
                </button>

              </td>
            </tr>
          </tbody>
        );
      });
      return expenseTable;
    }
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>

        {this.renderInfo()}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpenses: (expense) => dispatch(removeExpense(expense)),
});

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
