import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';

class Table extends Component {
  delete(id) {
    const { dispatchDeleteExpense } = this.props;
    return (
      <button
        type="button"
        data-testid="delete-btn"
        onClick={ () => dispatchDeleteExpense(id) }
      >
        Excluir
      </button>
    );
  }

  edit(id) {
    const { expenses, editForm } = this.props;
    return (
      <button
        type="button"
        data-testid="edit-btn"
        onClick={ () => editForm(expenses.find((expense) => expense.id === id)) }
      >
        Editar
      </button>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
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
          { expenses.map(({
            id,
            value,
            description,
            currency,
            method,
            tag,
            exchangeRates,
          }) => (
            <tr key={ id }>
              <td>{ description }</td>
              <td>{ tag }</td>
              <td>{ method }</td>
              <td>{ value }</td>
              <td>{ currency }</td>
              <td>{ Number(exchangeRates[currency].ask).toFixed(2) }</td>
              <td>
                {
                  (Number(exchangeRates[currency].ask) * Number(value))
                    .toFixed(2)
                }
              </td>
              <td>Real</td>
              <td>{ exchangeRates[currency].name }</td>
              <td>
                { this.edit(id)}
                { this.delete(id) }
              </td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchDeleteExpense: (id) => dispatch(deleteExpense(id)),
});

Table.propTypes = {
  expenses: PropTypes.array,
  dispatchDeleteExpense: PropTypes.func,
  editForm: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
