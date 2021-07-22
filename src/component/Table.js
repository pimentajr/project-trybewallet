import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { expenseDel } from '../actions';
import { GlobalContext } from '../GlobalContext';
import DeleteButton from './DeleteButton';
import TableHeads from './TableHeads';

const Table = () => {
  const { expenses } = useSelector((state) => state.wallet);
  const dispatch = useDispatch();
  const { providerValues } = useContext(GlobalContext);
  function handleClick(id) {
    dispatch(expenseDel(id));
    providerValues.setTotal(providerValues.total);
  }
  return (
    <table>
      <thead>
        <TableHeads />
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
            <td>
              <button type="button" data-testid="edit-btn">
                Editar
              </button>
              <DeleteButton
                onClick={ () => handleClick(expense.id) }
              />
            </td>
          </tr>
        ))}
      </thead>
    </table>
  );
};

export default Table;
