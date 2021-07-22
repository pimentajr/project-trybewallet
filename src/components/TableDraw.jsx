import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TableDraw extends Component {
  render() {
    const { expense, removeExpense, index } = this.props;
    return (
      <tr>
        <td>{ expense.description }</td>
        <td>{ expense.tag }</td>
        <td>{ expense.method }</td>
        <td>{ expense.value }</td>
        <td>{ expense.exchangeRates[expense.currency].name.split('/')[0] }</td>
        <td>{parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
        <td>
          { (parseFloat(expense.exchangeRates[expense.currency].ask)
          * expense.value).toFixed(2) }
        </td>
        <td>Real</td>
        <button
          type="button"
          onClick={ () => removeExpense(index) }
          data-testid="delete-btn"
        >
          [X]
        </button>
      </tr>
    );
  }
}

TableDraw.propTypes = {
  index: PropTypes.number.isRequired,
  removeExpense: PropTypes.func.isRequired,
  expense: PropTypes.shape({
    tag: PropTypes.string,
    method: PropTypes.string,
    value: PropTypes.string,
    currency: PropTypes.string,
    description: PropTypes.string,
    exchangeRates: PropTypes.shape({
      ask: PropTypes.number,
      name: PropTypes.string,
    }),
  }),
};

TableDraw.defaultProps = {
  expense: [],
};

export default TableDraw;
