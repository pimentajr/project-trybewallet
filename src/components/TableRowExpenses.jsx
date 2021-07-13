import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteTable, editing } from '../actions';

class TableRowExpenses extends Component {
  render() {
    const { expenses, dispatchDelete, dispatchEditing } = this.props;
    return (
      <tr>
        <td>{expenses.description}</td>
        <td>{expenses.tag}</td>
        <td>{expenses.method}</td>
        <td>
          {expenses.exchangeRates[expenses.currency].code}
          {' '}
          {Number(expenses.value).toFixed(2)}
        </td>
        <td>{expenses.exchangeRates[expenses.currency].name}</td>
        <td>
          R$
          {' '}
          {Number(expenses.exchangeRates[expenses.currency].ask).toFixed(2)}
        </td>
        <td>
          R$
          {' '}
          {
            (Number(expenses.exchangeRates[expenses.currency].ask)
              * Number(expenses.value)).toFixed(2)
          }
        </td>
        <td>Real Brasileiro</td>
        <td>
          <button
            type="button"
            data-testid="edit-btn"
            onClick={ () => {
              dispatchEditing(expenses);
            } }
            className="edit"
          >
            <span role="img" aria-label="editar">✏️</span>
          </button>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => dispatchDelete(expenses) }
            className="delete"
          >
            <span role="img" aria-label="editar">🗑️</span>
          </button>
        </td>
      </tr>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchDelete: (state) => dispatch(deleteTable(state)),
  dispatchEditing: (state) => dispatch(editing(state)),
});

TableRowExpenses.propTypes = {
  dispatchDelete: PropTypes.func.isRequired,
  dispatchEditing: PropTypes.func.isRequired,
  expenses: PropTypes.shape({
    currency: PropTypes.string,
    description: PropTypes.string,
    exchangeRates: PropTypes.oneOfType([PropTypes.object]),
    method: PropTypes.string,
    tag: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(TableRowExpenses);
