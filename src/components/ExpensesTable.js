import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TableHeader from './TableHeader';
import { deleteExpense } from '../actions/wallet';

class ExpensesTable extends Component {
  render() {
    const { expenses, deleteExpensesState } = this.props;
    return (
      <table>
        <TableHeader />
        { expenses.map((expense, index) => (
          <tr key={ index }>
            <td>
              { expense.description }
            </td>
            <td>
              { expense.tag }
            </td>
            <td>
              { expense.method }
            </td>
            <td>
              { expense.value }
            </td>
            <td>
              { (Object.values(expense.exchangeRates).find((cotacao) => (
                cotacao.code === expense.currency
              )).name).split('/')[0]}
            </td>
            <td>
              { parseFloat(Object.values(expense.exchangeRates).find((cotacao) => (
                cotacao.code === expense.currency
              )).ask).toFixed(2)}
            </td>
            <td>
              { Object.values(expense.exchangeRates).find((cotacao) => (
                cotacao.code === expense.currency
              )).ask * expense.value}
            </td>
            <td> Real </td>
            <td>
              <button
                type="button"
                onClick={ () => deleteExpensesState(expense) }
                data-testid="delete-btn"
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpensesState: (expense) => dispatch(deleteExpense(expense)),
});

ExpensesTable.propTypes = {
  expenses: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  deleteExpensesState: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
