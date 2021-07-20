import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {

  fa(total) {
    const number = (parseFloat(total.value) * total.exchangeRates[total.currency].ask);
    return Math.round(number * 100) / 100;
  }

  render() {
    const { expenses } = this.props;
    console.log('prop expenses:', expenses);
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
          {expenses
          && expenses.map((item, index) => (
            <tr key={ index }>
              <td>{item.description}</td>
              <td>{item.tag}</td>
              <td>{item.method}</td>
              <td>{item.value}</td>
              <td>{item.exchangeRates[item.currency].name}</td>
              <td>{Math.round((item.exchangeRates[item.currency].ask) * 100) / 100}</td>
              <td>
                { this.fa(item) }
              </td>
              <td>Real</td>
              <td>
                <button type="button">Editar</button>
                <button type="button">Excluir</button>
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

export default connect(mapStateToProps)(Table);
