import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { deleteExpense, editExpense } from '../actions';

class TableRow extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.removeGasto = this.removeGasto.bind(this);
  //   // this.editaGasto = this.editaGasto.bind(this);
  // }

  // removeGasto() {
  //   const { removeExpense, expense: { id } } = this.props;
  //   removeExpense(id);
  // }

  // editaGasto() {
  //   const { editingExpense, expense } = this.props;
  //   editingExpense(expense);
  // }

  render() {
    const { expense: {
      description,
      tag,
      method,
      value,
      currency,
      exchangeRates,
    }, removeGasto, editaGasto, index } = this.props;
    return (
      <tr>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{value}</td>
        <td>{exchangeRates[currency].name.split('/')[0]}</td>
        <td>{parseFloat(exchangeRates[currency].ask).toFixed(2)}</td>
        <td>{parseFloat(value * exchangeRates[currency].ask).toFixed(2)}</td>
        <td>Real</td>
        <button
          type="button"
          onClick={ () => editaGasto(index) }
          data-testid="edit-btn"
        >
          Editar
        </button>
        <button
          type="button"
          onClick={ () => removeGasto(index) }
          data-testid="delete-btn"
        >
          X
        </button>
      </tr>
    );
  }
}

TableRow.propTypes = {
  expense: PropTypes.shape({
    description: PropTypes.string,
    tag: PropTypes.string,
    method: PropTypes.string,
    value: PropTypes.number,
    id: PropTypes.number,
    currency: PropTypes.string,
    exchangeRates: PropTypes.shape({
      name: PropTypes.string,
      ask: PropTypes.number,
    }),
  }).isRequired,
  removeGasto: PropTypes.func.isRequired,
  editaGasto: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default connect(null, null)(TableRow);
