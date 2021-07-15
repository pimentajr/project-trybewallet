import React from 'react';

function handleSelectTag() {
  return (
    <label htmlFor="tag">
      Tag
      <select
        data-testid="tag-input"
        name="tag"
        id="tag"
        // value={ tag }
      // onChange={ this.handleChange }
      >
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
    </label>
  );
}

function form() {
  return (
    <div className="wrapper">
      <form>
        <label htmlFor="value">
          Valor
          <input type="text" name="value" id="value" />
        </label>
        <label htmlFor="description">
          Descrição
          <input type="text" name="description" id="description" />
        </label>
        <label htmlFor="currency">
          Moeda
          <select
            data-testid="currency-input"
            name="currency"
            id="currency"
          // value={ currencies }
          >
            <option>Selecione</option>
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento
          <select
            data-testid="method-input"
            name="method"
            id="method"
          // value={method}
          // onChange={this.handleChange}
          >
            <option value="dinheiro">Dinheiro</option>
            <option value="cartão de crédito">Cartão de Crédito</option>
            <option value="cartão de débito">Cartão de Débito</option>
          </select>
        </label>
        { handleSelectTag() }
      </form>
    </div>
  );
}

export default form;
