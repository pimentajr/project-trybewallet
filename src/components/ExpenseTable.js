import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionDelete } from '../actions';
import TableRow from './TableRow';

export default function ExpenseTable() {
  const expenses = useSelector((state) => state.wallet.expenses);
  const dispatch = useDispatch();
  const deleteSpend = (param) => dispatch(actionDelete(param));
  return (
    <table>
      <TableRow />
      <tbody>
        {
          expenses.map((item, index) => (
            <tr key={ index }>
              <td>{ item.description }</td>
              <td>{ item.tag }</td>
              <td>{ item.method }</td>
              <td>{ item.value }</td>
              <td>{ item.exchangeRates[item.currency].name }</td>
              <td>
                {
                  (Number(item.exchangeRates[item.currency].ask)).toFixed(2)
                }
              </td>
              <td>
                {
                  (Number(item.exchangeRates[item.currency].ask))
                    * Number(item.value)
                }
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => deleteSpend(index) }
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}
