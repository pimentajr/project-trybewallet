import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import deleteExpenseAction from '../actions/deleteExpenseAction';
import changeTypeFormAction from '../actions/changeTypeFormAction';

class TableExpense extends React.Component {
  renderExpenses() {
    const { expenses, deleteExpense, changeForm } = this.props;
    return (
      <tbody>
        { expenses.map((expense, key) => (
          <tr key={ key }>
            <td>{ expense.description }</td>
            <td>{ expense.tag }</td>
            <td>{ expense.method }</td>
            <td>{ expense.value }</td>
            <td>{ (expense.exchangeRates[expense.currency].name).split('/', 1) }</td>
            <td>
              {
                parseFloat(expense.exchangeRates[expense.currency].ask)
                  .toFixed(2)
              }
            </td>
            <td>
              {
                (expense
                  .exchangeRates[expense.currency]
                  .ask * parseFloat(expense.value))
                  .toFixed(2)
              }
            </td>
            <td>Real</td>
            <td>
              <button
                type="button"
                data-testid="delete-btn"
                onClick={ () => deleteExpense(expense) }
              >
                Excluir
              </button>
              <button
                type="button"
                data-testid="edit-btn"
                onClick={ () => changeForm('edit', key) }
              >
                Editar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
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
        { this.renderExpenses() }
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (expense) => dispatch(deleteExpenseAction(expense)),
  changeForm: (typeForm, key) => dispatch(changeTypeFormAction(typeForm, key)),
});

TableExpense.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
  })).isRequired,
  deleteExpense: PropTypes.func.isRequired,
  changeForm: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableExpense);
