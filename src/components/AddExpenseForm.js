import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isFetching, spendInformation } from '../actions';
import CoinOptions from './CoinOptions';

function optionMethods() {
  return (
    <>
      <option value="Dinheiro">Dinheiro</option>
      <option value="Cartão de crédito">Cartão de crédito</option>
      <option value="Cartão de débito">Cartão de débito</option>
    </>
  );
}

function optionTags() {
  return (
    <>
      <option value="Alimentação">Alimentação</option>
      <option value="Lazer">Lazer</option>
      <option value="Trabalho">Trabalho</option>
      <option value="Transporte">Transporte</option>
      <option value="Saúde">Saúde</option>
    </>
  );
}

const initialState = {
  id: 0,
  value: 0,
  description: '',
  currency: 'USD',
  method: '',
  tag: '',
};

function AddExpenseForm() {
  const [states, setState] = useState(initialState);
  const rates = useSelector((state) => state.wallet.rates);
  const dispatch = useDispatch();
  const fetching2 = () => dispatch(isFetching());
  const spendInfor = (param) => dispatch(spendInformation(param));
  useEffect(() => {
    const fetching = () => dispatch(isFetching());
    fetching();
  }, []);
  function handleInput({ target: { name, value } }) {
    if (name) return setState({ ...states, [name]: value });
  }
  function handleAddSpend() {
    fetching2();
    spendInfor({ ...states, exchangeRates: rates });
    setState({ ...states, id: states.id + 1 });
  }
  return (
    <form>
      <label htmlFor="spent">
        Valor:
        <input type="number" name="value" id="spent" onChange={ handleInput } />
      </label>
      <label htmlFor="describe">
        Descrição:
        <input type="text" name="description" id="describe" onChange={ handleInput } />
      </label>
      <label htmlFor="coin">
        Moeda:
        <select type="text" name="currency" id="coin" onChange={ handleInput }>
          <CoinOptions />
        </select>
      </label>
      <label htmlFor="payment">
        Método de pagamento:
        <select type="text" name="method" id="payment" onChange={ handleInput }>
          { optionMethods() }
        </select>
      </label>
      <label htmlFor="tag">
        Tag:
        <select type="text" name="tag" id="tag" onChange={ handleInput }>
          { optionTags() }
        </select>
      </label>
      <button type="button" onClick={ handleAddSpend }>Adicionar despesa</button>
    </form>
  );
}

export default AddExpenseForm;
