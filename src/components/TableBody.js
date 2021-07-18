import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../actions';

class TableBody extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { expenses, deleteExpenseAction } = this.props;
    const { id } = target;
    const filteredExpenses = expenses
      .filter((deletedExpense) => deletedExpense.id !== parseFloat(id));
    deleteExpenseAction(filteredExpenses);
  }

  render() {
    const { expenses } = this.props;
    return (
      <tbody>
        {expenses ? expenses.map((dataRow) => (
          <tr key={ dataRow.id } className="line">
            <td>{dataRow.description}</td>
            <td>{dataRow.tag}</td>
            <td>{dataRow.method}</td>
            <td>{dataRow.value}</td>
            <td>{(dataRow.exchangeRates[dataRow.currency].name).split('/')[0]}</td>
            <td>{Number(dataRow.exchangeRates[dataRow.currency].ask).toFixed(2)}</td>
            <td>
              {Number((dataRow.value * dataRow.exchangeRates[dataRow.currency].ask))
                .toFixed(2) }
            </td>
            <td>Real</td>
            <td>
              <button
                type="button"
                id={ dataRow.id }
                onClick={ this.handleChange }
                data-testid="delete-btn"
              >
                Deletar
              </button>
            </td>
          </tr>
        )) : <span /> }
      </tbody>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpenseAction: (payload) => dispatch(deleteExpense(payload)),
});

TableBody.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(TableBody);
