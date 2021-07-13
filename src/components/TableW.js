import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { delExpense } from '../actions/index';

export class TableW extends Component {
  render() {
    const { expenses, deleteExpense } = this.props;
    return (
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
        {/* consulta ao projeto do Alberto Candido para ver formato de função. */}
        {expenses.length > 0 && expenses.map((expense, index) => {
          const exchangeRate = Object.entries(expense.exchangeRates)
            .find(([i]) => i === expense.currency)[1];
          return (
            <tr key={ index }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{expense.value}</td>
              <td>{exchangeRate.name.split('/')[0]}</td>
              <td>{Number(exchangeRate.ask).toFixed(2)}</td>
              <td>{(Number(expense.value) * Number(exchangeRate.ask)).toFixed(2)}</td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  onClick={ () => deleteExpense(expense.id) }
                  data-testid="delete-btn"
                >
                  Deletar
                </button>
                <button
                  type="button"
                >
                  Editar
                </button>
              </td>
            </tr>);
        })}
      </table>
    );
  }
}

TableW.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(delExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableW);
