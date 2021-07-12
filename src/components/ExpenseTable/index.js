import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { roundCurrency } from '../../helpers/utils';
import { removeExpense } from '../../actions';

const headers = [
  'Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda', 'Câmbio utilizado',
  'Valor convertido', 'Moeda de conversão', 'Editar/Excluir',
];

class ExpenseTable extends React.Component {
  generateTableHead() {
    return headers.map((header, index) => <th key={ index }>{header}</th>);
  }

  generateTableBody() {
    const { expenses, deleteExpense, setEditingExpense } = this.props;

    return expenses.map((expense, index) => (
      <tr key={ index }>
        <td>{expense.description}</td>
        <td>{expense.tag}</td>
        <td>{expense.method}</td>
        <td>{roundCurrency(expense.value)}</td>
        <td>{expense.exchangeRates[expense.currency].name.split('/')[0]}</td>
        <td>{roundCurrency(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
        <td>
          { roundCurrency(expense.value * expense.exchangeRates[expense.currency].ask) }
        </td>
        <td>Real</td>
        <td>
          <button
            type="button"
            onClick={ () => setEditingExpense(expense) }
            data-testid="edit-btn"
          >
            Editar
          </button>
          <button
            type="button"
            onClick={ () => deleteExpense(expense.id) }
            data-testid="delete-btn"
          >
            Deletar
          </button>
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <table>
        <thead>
          <tr>{ this.generateTableHead() }</tr>
        </thead>
        <tbody>{ this.generateTableBody() }</tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(removeExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  deleteExpense: PropTypes.func,
}.isRequired;
