import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, enableEditExpense } from '../actions/wallet';
import TableHeader from './TableHeader';

class ExpensesTable extends Component {
  render() {
    const { expenses, deleteExpenseFromState, enableEditButton } = this.props;
    return (
      <table className="expenses-table">
        <TableHeader />
        <tbody>
          { expenses.map((expense, index) => (
            <tr key={ index }>
              <td>{ expense.description }</td>
              <td>{ expense.tag }</td>
              <td>{ expense.method }</td>
              <td>{ expense.value }</td>
              <td>
                { expense.exchangeRates[expense.currency].name.split('/')[0]}

              </td>
              <td>
                { parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}
              </td>
              <td>
                { (expense.exchangeRates[expense.currency]
                  .ask * expense.value).toFixed(2) }
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => enableEditButton(expense.id) }
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={ () => deleteExpenseFromState(expense) }
                  data-testid="delete-btn"
                >
                  Excluir
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
  deleteExpenseFromState: (expense) => dispatch(deleteExpense(expense)),
  enableEditButton: (id) => dispatch(enableEditExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  deleteExpenseFromState: PropTypes.func.isRequired,
  enableEditButton: PropTypes.func.isRequired,
};
