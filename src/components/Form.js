import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { GlobalContext } from '../GlobalContext';

export const Form = () => {
  const state = useSelector(state => state.wallet)
  const { currencies } = state;
  const context = useContext(GlobalContext);
  const { paymentStore, setPaymentStore } = context;
  console.log(paymentStore);

  return (
    <form className="Form" action="#">
      <label htmlFor="form-value">
        Valor:
        <input type="text" onChange={({ target }) => setPaymentStore.setValue(target.value) } id="form-value" />
      </label>

      <label htmlFor="form-description">
        Descrição:
        <input type="text" name="Descrição" onChange={({ target }) => setPaymentStore.setDescription(target.value) } id="form-description" />
      </label>

      <label htmlFor="form-currency">
        Moeda:
        <select id="form-currency" name="Moeda" onChange={({ target }) => setPaymentStore.setCurrency(target.value) } >
          {currencies.map((currency) => (
            <option key={ currency }>{ currency }</option>
          ))}
        </select>
      </label>

      <label htmlFor="form-pay-method">
        Método de pagamento:
        <select id="form-pay-method" onChange={({ target }) => setPaymentStore.setMethod(target.value) } name="Pagamento">
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </label>

      <label htmlFor="form-category">
        Tag:
        <select id="form-category" onChange={({ target }) => setPaymentStore.setTag(target.value) } name="Categoria">
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </label>
    </form>
  );
};

export default Form;
