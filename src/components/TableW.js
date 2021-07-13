import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class TableW extends Component {
  render() {
    const { expenses } = this.props;
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
        {expenses.length > 0 && expenses.map((expense, index) => {
          console.log(expense);
          const exchangeRate = Object.entries(expense.exchangeRates)
            .find(([key]) => key === expense.currency)[1];
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
};

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(TableW);
