import React, { Component } from 'react';
import store from '../store';
// import { userEmail } from '../actions';

export default class ExpensesForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      expensesValue: '',
      description: '',
      currency: 'USD',
      paymentMethod: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { id, value } = e.target;
    this.setState(() => ({ [id]: value }));
  }

  render() {
    const { wallet } = store.getState();
    const { currencies } = wallet;

    const filteredCurrencies = currencies.map((currency, key) => {
      const { code } = currency;
      return <option key={ key } value={ code }>{ code }</option>;
    });

    return (
      <form className="wallet__form" action="#">
        <label htmlFor="value">
          <strong>Valor</strong>
          <input id="value" type="text" onChange={ this.handleChange } />
        </label>
        <label htmlFor="description">
          <strong>Descrição</strong>
          <input id="description" type="text" onChange={ this.handleChange } />
        </label>
        <label htmlFor="currency">
          <strong>Moeda</strong>
          <select
            id="currency"
            onClick={ this.handleChange }
          >
            { filteredCurrencies }
          </select>
        </label>
        <label htmlFor="paymentMethod">
          <strong>Método de pagamento</strong>
          <select id="paymentMethod" onChange={ this.handleChange }>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          <strong>Tag</strong>
          <select id="tag" onClick={ this.handleChange }>
            <option value="food">Alimentação</option>
            <option value="freetime">Lazer</option>
            <option value="work">Trabalho</option>
            <option value="transport">Transporte</option>
            <option value="health">Saúde</option>
          </select>
        </label>
        <button type="button">Adicionar despesa</button>
      </form>
    );
  }
}
