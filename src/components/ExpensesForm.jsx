import React, { Component } from 'react';
import store from '../store';

export default class ExpensesForm extends Component {
  render() {
    const { wallet } = store.getState();
    const { currencies } = wallet;

    return (
      <form className="wallet__form" action="#">
        <label htmlFor="value">
          Valor
          <input name="value" type="text" />
        </label>
        <label htmlFor="description">
          Descrição
          <input name="description" type="text" />
        </label>
        <label htmlFor="currency">
          Moeda
          <select name="currency">
            {
              currencies.map((currency, key) => {
                const { code } = currency;
                return <option key={ key } value={ code }>{ code }</option>;
              })
            }
          </select>
        </label>
        <label htmlFor="paymentMethod">
          Método de pagamento
          <select name="paymentMethod">
            <option value="cash">Dinheiro</option>
            <option value="cash">Cartão de crédito</option>
            <option value="cash">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select name="tag">
            <option value="food">Alimentação</option>
            <option value="cash">Lazer</option>
            <option value="work">Trabalho</option>
            <option value="transport">Transporte</option>
            <option value="health">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}
