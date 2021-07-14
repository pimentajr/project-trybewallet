import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';

class ExpenseTable extends Component {
  constructor() {
    super();
    this.deleteExpense = this.deleteExpense.bind(this);
  }

  deleteExpense(id) {
    const { deleteExpense } = this.props;
    deleteExpense(id);
  }

  renderThead() {
    return (
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
    );
  }

  renderTbody() {
    const { expenses } = this.props;
    return (
      <tbody>
        {expenses.map((res) => (
          <tr key={ res.id }>
            <td>{res.description}</td>
            <td>{res.tag}</td>
            <td>{res.method}</td>
            <td>{res.value }</td>
            <td>{res.exchangeRates[res.currency].name.split('/')[0]}</td>
            <td>
              { Number(res.exchangeRates[res.currency].ask).toFixed(2)}
            </td>
            <td>
              { Number(res.value * res.exchangeRates[res.currency].ask).toFixed(2)}
            </td>
            <td>Real</td>
            <td>
              <button
                type="button"
                data-testid="edit-btn"
              >
                Editar
              </button>
              <button
                type="button"
                data-testid="delete-btn"
                onClick={ () => this.deleteExpense(res.id) }
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }

  render() {
    return (
      <table className="expense-table">
        { this.renderThead() }
        { this.renderTbody() }
      </table>
    );
  }
}

ExpenseTable.propTypes = {
  expenses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(deleteExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
