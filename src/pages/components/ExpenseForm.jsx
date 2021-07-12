import React from 'react';

class ExpenseForm extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="money-value">
          Valor
          <input type="number" id="money-value" />
        </label>

        <label htmlFor="describe">
          Descrição
          <input type="text" id="describe" />
        </label>

        <label htmlFor="currency">
          Moeda
          <select id="currency">
            <option> BRL </option>
          </select>
        </label>

        <label htmlFor="pay-method">
          Método de pagamento
          <select id="pay-method">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>

        </label>

        <label htmlFor="tag">
          tag
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

export default ExpenseForm;
