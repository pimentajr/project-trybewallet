import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TableDraw extends Component {
  render() {
    const { expense } = this.props;
    return (
      <tr>
        <td>{ expense.description }</td>
        <td>{ expense.tag }</td>
        <td>{ expense.method }</td>
        <td>{ expense.value }</td>
        <td>{ expense.exchangeRates[expense.currency].name.split('/')[0] }</td>
        <td>{parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
        <td>
          { parseFloat(expense.value
          * expense.exchangeRates[expense.currency].ask).toFixed(2) }
        </td>
        <td>Real</td>
      </tr>
    );
  }
}

TableDraw.propTypes = {
  expense: PropTypes.shape({
    tag: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    exchangeRates: PropTypes.shape({
      ask: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }),
};

TableDraw.defaultProps = {
  expense: [],
};

export default TableDraw;
