// arquivo feito juntamente com o aluno jhonata pontes
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions/index';

class ExpenseTable extends React.Component {
  render() {
    const { expenses, deleteAction } = this.props;
    console.log(expenses);
    return (
      <table>
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
        {expenses.length > 0 && expenses.map((expense, index) => {
          const exchangeRate = Object.entries(expense.exchangeRates)
            .find(([i]) => i === expense.currency)[1];
          return (
            <tr key={ index }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{expense.value}</td>
              <td>{exchangeRate.name.split('/')[0]}</td>
              <td>{Number(exchangeRate.ask).toFixed(2)}</td>
              <td>{(Number(expense.value) * Number(exchangeRate.ask)).toFixed(2)}</td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  onClick={ () => deleteAction(expense.id) }
                  data-testid="delete-btn"
                >
                  Deletar
                </button>
                <button
                  type="button"
                >
                  Editar
                </button>
              </td>
            </tr>);
        })}
      </table>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});
const mapDispatchToProps = (dispatch) => ({
  deleteAction: (id) => dispatch(deleteExpense(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);

ExpenseTable.propTypes = {
  expenses: PropTypes.array,
  deleteAction: PropTypes.func,
  dispatchDeleteButton: PropTypes.func,
}.isRequired;
