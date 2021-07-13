import React from 'react';

export default function ExpenseFormWallet() {
  return (
    <form>
      <label htmlFor="value">
        Valor:
        <input id="value" type="number" name="value" onChange={ {/* function */} } />
      </label>
      <label htmlFor="currency">
        Moeda:
        <select
          id="currency"
          name="currency"
          onChange={ {/* function */} }
        >
          <option value="">coin- API</option>
        </select>
      </label>
      <label htmlFor="method">
        Método de pagamento
        <select name="method" id="method" onChange={ {/* function */} }>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
      <label htmlFor="tag">
        Tag
        <select name="tag" id="tag" onChange={ {/* function */} }>
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
      <label htmlFor="description">
        Descrição
        <input
          id="description"
          type="text"
          name="description"
          onChange={ {/* function */} }
        />
      </label>
      <button type="button" onChange={ {/* function */} }>Adicionar despesa</button>
    </form>
  );
}
