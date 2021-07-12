import React from 'react';

class Expenses extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="valor">
          Valor:
          <input type="text" name="valor" id="valor" />
        </label>
        <label htmlFor="descrição">
          Descrição:
          <input type="text" name="descrição" id="descrição" />
        </label>
        <label htmlFor="moeda">
          Moeda:
          <select id="moeda">
            <option>
              1
            </option>
          </select>
        </label>
        <label htmlFor="método de pagamento">
          método de pagamento
          <select id="método de pagamento">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select id="tag">
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

export default Expenses;
