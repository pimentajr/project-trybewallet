import React from 'react';

const TableHeads = () => {
  const [table] = React.useState(['Descrição',
    'Tag', 'Método de pagamento', 'Valor', 'Moeda', 'Câmbio utilizado',
    'Valor convertido', 'Moeda de conversão', 'Editar/Excluir']);

  return (
    <tr>
      {table.map((elem, key) => <th key={ key }>{ elem }</th>)}
    </tr>
  );
};

export default TableHeads;
