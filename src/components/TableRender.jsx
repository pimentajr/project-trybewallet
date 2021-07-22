/* eslint-disable react/react-in-jsx-scope */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TableDraw from './TableDraw';
import { deleteExpense } from '../actions';

class TableRender extends Component {
  constructor() {
    super();
    this.removeExpense = this.removeExpense.bind(this);
  }

  removeExpense(index) {
    const { delExpense, expenses } = this.props;
    delExpense(expenses[index].id);
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
        <tbody>
          { expenses.map((expense, key) => (
            <TableDraw
              key={ key }
              index={ key }
              expense={ expense }
              removeExpense={ () => this.removeExpense(expense.id) }
            />
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  // API: () => dispatch(fetchAPI()),
  delExpense: (id) => dispatch(deleteExpense(id)),
});

TableRender.propTypes = {
  expenses: PropTypes.arrayOf(Object),
  // delExpense: PropTypes.func.isRequired,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(TableRender);
