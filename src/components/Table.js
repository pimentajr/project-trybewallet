import React from 'react';

class Table extends React.Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th colSpan="2">Editar/Excluir</th>
          </tr>
        </thead>
      </table>
    );
  }
}

export default Table;