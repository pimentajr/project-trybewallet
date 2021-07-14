import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { GlobalContext } from '../GlobalContext';

const Table = () => {
  const { expenses } = useSelector((state) => state.wallet);
  const { providerValues } = useContext(GlobalContext);
  const { rate } = providerValues;
  const [table] = React.useState(['Descrição',
    'Tag', 'Método de pagamento', 'Valor', 'Moeda', 'Câmbio utilizado',
    'Valor convertido', 'Moeda de conversão', 'Editar/Excluir']);
  console.log('Total e rate:', rate);
  return (
    <table>
      <thead>
        <tr>
          {table.map((elem, key) => <th key={ key }>{ elem }</th>)}
        </tr>
        {expenses.length > 0 && expenses.map((expense, key) => (
          <tr key={ key }>
            <td className="carteira-table-cell">{ expense.description }</td>
            <td className="carteira-table-cell">{ expense.tag }</td>
            <td className="carteira-table-cell">{ expense.method }</td>
            <td className="carteira-table-cell">{ expense.value }</td>
            <td
              className="carteira-table-cell"
            >
              { expense.exchangeRates[expense.currency].name }
            </td>
            <td
              className="carteira-table-cell"
            >
              { Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }
            </td>
            <td
              className="carteira-table-cell"
            >
              { Number(expense.exchangeRates[expense.currency].ask * expense.value)
                .toFixed(2) }
            </td>
            <td className="carteira-table-cell">Real</td>
          </tr>
        ))}
        <button type="button" data-testid="delete-btn">Deletar</button>
      </thead>
    </table>
  );
};

export default Table;
