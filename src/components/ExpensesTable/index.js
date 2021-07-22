import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeSpecificExpense, editSpecificExpense } from '../../actions';
import trashButtonLogo from '../../images/trash-alt-regular.svg';
import editButtonLogo from '../../images/edit-regular.svg';

const headers = [
  'Descrição',
  'Tag',
  'Método de pagamento',
  'Valor',
  'Moeda',
  'Câmbio utilizado',
  'Valor convertido',
  'Moeda de conversão',
  'Editar/Excluir'];

class ExpensesTable extends Component {
  convertCurrencyValueToBRL(expense) {
    return (Number(expense.value) * expense.exchangeRates[expense.currency]
      .ask).toFixed(2);
  }

  actualCurrency(expense) {
    return expense.exchangeRates[expense.currency].name.split('/')[0];
  }

  actualCotation(expense) {
    return (Number(expense.exchangeRates[expense.currency]
      .ask).toFixed(2));
  }

  deleteThisExpense(expenseId) {
    const { removeExpense } = this.props;
    removeExpense(expenseId);
  }

  editThisExpense(expenseId) {
    const { editExpense } = this.props;
    editExpense(expenseId);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table className="expenses-table">
        <thead>
          <tr>
            {headers.map((head) => <th key={ head }>{head}</th>)}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{expense.value}</td>
              <td>{this.actualCurrency(expense)}</td>
              <td>{this.actualCotation(expense)}</td>
              <td>{this.convertCurrencyValueToBRL(expense)}</td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => this.editThisExpense(expense.id) }
                >
                  <img src={ editButtonLogo } alt="Botão editar" />
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => this.deleteThisExpense(expense.id) }
                >
                  <img src={ trashButtonLogo } alt="Botão deletar" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (expenseId) => dispatch(removeSpecificExpense(expenseId)),
  editExpense: (expenseId) => dispatch(editSpecificExpense(expenseId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
