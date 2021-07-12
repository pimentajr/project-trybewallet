import React, { Component } from 'react';

class ExpenseTable extends Component {
  render() {
    return (
      <div>
        <table className="expense-table">
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
          <tbody>
            <tr>
              <td>Murilo</td>
              <td>Liceni</td>
              <td>Karol</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default ExpenseTable;
