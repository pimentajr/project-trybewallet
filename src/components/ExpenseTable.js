import React from 'react';
import { useSelector } from 'react-redux';
import TableRow from './TableRow';

export default function ExpenseTable() {
  const expenses = useSelector((state) => state.wallet.expenses);
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
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}
