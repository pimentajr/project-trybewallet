import React from 'react';

class Thead extends React.Component {
  render() {
    return (
      <thead>
        <tr className="titles">
          <th className="column"> Descrição </th>
          <th className="column"> Tag </th>
          <th className="column"> Método de pagamento </th>
          <th className="column">Valor </th>
          <th className="column"> Moeda </th>
          <th className="column"> Câmbio utilizado </th>
          <th className="column"> Valor convertido </th>
          <th className="column"> Moeda de conversão </th>
          <th className="column"> Editar/Excluir </th>
        </tr>
      </thead>
    );
  }
}

export default Thead;
