import React, { Component } from 'react';

class AddExpenses extends Component {
  render() {
    return (
      <form>
        <label htmlFor="value">
          Valor
          <input type="text" name="value" id="value" />
        </label>
        <label htmlFor="describe">
          Descrição
          <input type="text" name="describe" id="describe" />
        </label>
        <label htmlFor="coin">
          Moeda
          <select type="select" name="coin" id="coin" />
        </label>
        <label htmlFor="payMethod">
          Método de pagamento
          <select type="select" name="payMethod" id="payMethod">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select type="select" name="tag" id="tag">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

export default AddExpenses;
