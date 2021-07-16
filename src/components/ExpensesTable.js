import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ExpensesTable extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </thead>
        { expenses.map((expense, index) => (
          <tr key={ index }>
            <td>
              { expense.description }
            </td>
            <td>
              { expense.tag }
            </td>
            <td>
              { expense.method }
            </td>
            <td>
              { expense.value }
            </td>
            <td>
              { (Object.values(expense.exchangeRates).find((cotacao) => (
                cotacao.code === expense.currency
              )).name).split('/')[0]}
            </td>
            <td>
              { parseFloat(Object.values(expense.exchangeRates).find((cotacao) => (
                cotacao.code === expense.currency
              )).ask).toFixed(2)}
            </td>
            <td>
              { Object.values(expense.exchangeRates).find((cotacao) => (
                cotacao.code === expense.currency
              )).ask * expense.value}
            </td>
            <td> Real </td>
          </tr>
        ))}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(ExpensesTable);

ExpensesTable.propTypes = {
  expenses: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};
