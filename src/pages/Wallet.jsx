import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actionFunctions from '../actions';
import CoinOptions from '../components/CoinOptions';
import TableHead from '../components/TableHead';
import TagOptions from '../components/TagOptions';
import TableBody from '../components/TableBody';
import MethodOptions from '../components/MethodOptions';

const Wallet = () => {
  const [expenses, setExpenses] = useState({id: -1});
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.user.email);
  
  let allCurrencies = useSelector((state) => state.wallet.currencies);
  let savedExpenses = useSelector((state) => state.wallet.expenses);
  const expensesWithRates = savedExpenses
  .map((item) => Number(item.exchangeRates[item.currency].ask) * Number(item.value));
  
  const handleExpInput = (e) => {
    const { target } = e;
    const { value, name } = target;
    setExpenses({...expenses, [name]: value});
  }

  const submitExpense = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const nextId = savedExpenses.length === 0 ? 0 : savedExpenses.length;
    dispatch(actionFunctions.fetchCurrency())
    dispatch(actionFunctions.saveExpenses({...expenses, exchangeRates: allCurrencies, id: nextId}));
  }

  useEffect(() => {
    dispatch(actionFunctions.fetchCurrency())
  },[]) // segundo parâmentro sendo array vazio apenas atualiza na montagem do componente
  return (
    <section>
      <nav>
        <div data-testid="email-field">
          {userEmail}
        </div>
        <div data-testid="total-field">
          {expensesWithRates.reduce((acc, curr) => {
              acc += curr;
              return acc;
            }, 0)}
        </div>
        <div data-testid="header-currency-field">
          BRL
        </div>
        <form>
          <label>
            Valor
            <input type="number" name="value" onChange={handleExpInput}/>
          </label>
          <label>
            Descrição
            <input type="text" name="description" onChange={handleExpInput}/>
          </label>
          <label>
            Moeda
            <select id="" name='currency' onChange={handleExpInput}>
              <CoinOptions currencies={allCurrencies} />
            </select>
          </label>
          <label>
            Método de pagamento
            <select name="method" id="" onChange={handleExpInput}>
              <MethodOptions />
            </select>
          </label>
          <label>
            Tag
            <select name="tag" id="" onChange={handleExpInput}>
              <TagOptions />
            </select>
          </label>
          <button onClick={submitExpense}>Adicionar despesa</button>
        </form>
      </nav>
      <hr></hr>
      <br></br>
      <table>
        <TableHead />
        <TableBody expenses={savedExpenses}/>
      </table>
    </section>
  )
}

export default Wallet;
