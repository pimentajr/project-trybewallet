/* eslint-disable react/react-in-jsx-scope */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';

class TableRender extends Component {
  constructor() {
    super();
    this.removeExpense = this.removeExpense.bind(this);
  }

  removeExpense(index) {
    const { removeExpense, expenses } = this.props;
    removeExpense(expenses[index].id);
  }

  render() {
    const { expenses } = this.props;
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
        {expenses.map((expense, index) => (
          <tr key={ index }>
            <td>{expense.description}</td>
            <td>{expense.tag}</td>
            <td>{expense.method}</td>
            <td>{expense.value}</td>
            <td>{expense.exchangeRates[expense.currency].name.split('/')[0]}</td>
            <td>{parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
            <td>
              {parseFloat(expense.value * expense.exchangeRates[expense.currency].ask)
                .toFixed(2)}
            </td>
            <td>Real</td>
            <td>
              <button
                type="button"
                data-testid="delete-btn"
                onClick={ () => this.removeExpense(expense.id) }
              >
                [X]
              </button>
            </td>
          </tr>
        ))}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (id) => dispatch(deleteExpense(id)),
});

TableRender.propTypes = {
  expenses: PropTypes.arrayOf(Object),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(TableRender);
