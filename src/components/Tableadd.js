import React from 'react';
import PropTypes from 'prop-types';

class Tableadd extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <tr>
        <td>{ expenses.description }</td>
        <td>{ expenses.tag }</td>
        <td>{ expenses.method }</td>
        <td>{ expenses.value }</td>
        <td>{ expenses.exchangeRates[expenses.currency].name.split('/')[0]}</td>
        <td>{ Number(expenses.exchangeRates[expenses.currency].ask).toFixed(2)}</td>
        <td>
          { (expenses.value * expenses.exchangeRates[expenses.currency].ask).toFixed(2)}
        </td>
        <td>Real</td>
        <td>
          <button
            data-testid="edit-btn"
            type="button"
          >
            Editar
          </button>
        </td>
        <td>
          <button
            data-testid="delete-btn"
            type="button"
          >
            Remover
          </button>
        </td>
      </tr>
    );
  }
}

Tableadd.propTypes = {
  expenses: PropTypes.object,
}.isRequired;

export default Tableadd;
