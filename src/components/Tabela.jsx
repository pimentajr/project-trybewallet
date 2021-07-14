import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TableRow from './TableRow';
import { deleteExpense, editExpense } from '../actions';

class Tabela extends Component {
  constructor(props) {
    super(props);
    this.removeGasto = this.removeGasto.bind(this);
    this.editaGasto = this.editaGasto.bind(this);
  }
  
  removeGasto(index) {
    const { removeExpense, allExpenses } = this.props;
    removeExpense(allExpenses[index].id);
  }

  editaGasto(index) {
    const { editingExpense, allExpenses } = this.props;
    editingExpense(allExpenses[index]);
  }

  render() {
    const { allExpenses } = this.props;
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
          { allExpenses.map((expense,
            index) => <TableRow key={ index } index={ index } expense={ expense } removeGasto={ () => this.removeGasto(index) } editaGasto={ () => this.editaGasto(index) } />)}
        </tbody>
      </table>
    );
  }
}

const MapStateToProps = (state) => ({
  allExpenses: state.wallet.expenses,
});

const MapDispatchToProps = (dispatch) => ({
  removeExpense: (id) => dispatch(deleteExpense(id)),
  editingExpense: (expense) => dispatch(editExpense(expense)),
});

Tabela.propTypes = {
  allExpenses: PropTypes.arrayOf(),
}.isRequired;

export default connect(MapStateToProps, MapDispatchToProps)(Tabela);
