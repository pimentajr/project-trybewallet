import React from 'react';
import { useSelector } from 'react-redux';

const Table = () => {
  const { expenses } = useSelector((state) => state.wallet);
  const [table] = React.useState([
    'Descrição',
    'Tag',
    'Método de pagamento',
    'Valor',
    'Moeda',
    'Câmbio utilizado',
    'Valor convertido',
    'Moeda de conversão',
    'Editar/Excluir',
  ]);
  return (
    <table>
      <thead>
        <tr>
          {table.map((item, key) => <th key={ key }>{ item }</th>)}
        </tr>
        {expenses.length > 0 && expenses.map((expense, key) => (
          <tr key={ key }>
            <td className="carteira-table-cell">{expense.description}</td>
            <td className="carteira-table-cell">{expense.tag}</td>
            <td className="carteira-table-cell">{expense.method}</td>
            <td className="carteira-table-cell">{expense.value}</td>
            <td className="carteira-table-cell">
              {expense.exchangeRates[expense.currency].name}
            </td>
            <td className="carteira-table-cell">
              {Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}
            </td>
            <td className="carteira-table-cell">
              { Number(expense.exchangeRates[expense.currency].ask * expense.value)
                .toFixed(2) }
            </td>
            <td className="carteira-table-cell">Real</td>
            <td>
              <button type="button" data-testid="edit-btn">
                Editar
              </button>
            </td>
          </tr>
        ))}
      </thead>
    </table>
  );
};

export default Table;
