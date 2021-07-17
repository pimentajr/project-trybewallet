import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import fetchCurrencyList from '../service/currencyApi';
import SelectOptions from './SelectOptions';

function Form() {
  const currencyList = useSelector((state) => state.wallet.currencies);
  useEffect(() => {
    fetchCurrencyList();
  });
  return (
    <div>
      <form>
        <SelectOptions />
        <label htmlFor="currency">
          Moeda
          <select id="currency">
            {currencyList
              ? currencyList
                .filter((coin) => coin !== 'USDT')
                .map((coinFinal, index) => <option key={ index }>{coinFinal}</option>)
              : '' }
          </select>
        </label>
        <label htmlFor="payment-option">
          Método de pagamento:
          <select id="payment-option">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select id="tag">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
      </form>
    </div>
  );
}

export default Form;
