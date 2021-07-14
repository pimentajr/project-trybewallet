import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpenseAction, editExpenseAction } from '../actions';

class ExpenseItem extends Component {
  constructor(props) {
    super(props);
    this.handleDeleteExpense = this.handleDeleteExpense.bind(this);
  }

  handleEditExpense(id) {
    const { editExpense } = this.props;
    editExpense(id);
  }

  handleDeleteExpense(id) {
    const { deleteExpense } = this.props;
    deleteExpense(id);
  }

  render() {
    const { expense } = this.props;
    const formattedValue = (expense.value / 100).toFixed(2);
    const exchangeRate = Number(expense.exchangeRates[expense.currency].ask);
    const currencyName = expense.exchangeRates[expense.currency].name;
    const convertedValue = Number(expense.value / 100) * exchangeRate;
    return (
      <tr>
        <td>{ expense.description }</td>
        <td>{ expense.tag }</td>
        <td>{ expense.method }</td>
        <td>{ formattedValue }</td>
        <td>{ currencyName.split('/')[0] }</td>
        <td>{ exchangeRate.toFixed(2) }</td>
        <td>{ convertedValue.toFixed(2) }</td>
        <td>Real</td>
        <td>
          <button
            type="button"
            data-testid="edit-btn"
            onClick={ () => this.handleEditExpense(expense.id) }
          >
            Editar

          </button>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => this.handleDeleteExpense(expense.id) }
          >
            Excluir

          </button>
        </td>
      </tr>
    );
  }
}

ExpenseItem.propTypes = {
  deleteExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
  expense: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    exchangeRates: PropTypes.shape({
      name: PropTypes.string,
      ask: PropTypes.string,
    }),
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(deleteExpenseAction(id)),
  editExpense: (id) => dispatch(editExpenseAction(id)),
});

export default connect(null, mapDispatchToProps)(ExpenseItem);
