/* import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderWallet from '../components/HeaderWallet';
import ExpenseFormWallet from '../components/ExpenseFormWallet';
import { fetchApi, saveExpenses } from '../actions';

export default function Wallet() {
  const [expenses, setExpenses] = useState({ id: -1 });
  const walletStore = useSelector((state) => state.wallet.expenses);
  const dispatch = useDispatch();
  const handleChange = (element) => {
    const { target } = element;
    const { name, value } = target;
    setExpenses({ ...expenses, [name]: value });
    console.log(name, value);
  };
  const handleAddExpense = () => {
    const nextId = walletStore.expenses.length === 0
      ? 0
      : walletStore.expenses.length;
    dispatch(fetchApi());
    dispatch(saveExpenses({
      exchangeRates: walletStore.currencies,
      id: nextId,
    }));
  };
  useEffect(() => { dispatch(fetchApi(), []); });

  return (
    <section>
      <HeaderWallet />
      <ExpenseFormWallet
        handleChange={ handleChange }
        handleAddExpense={ handleAddExpense }
      />
    </section>

  );
}
 */
