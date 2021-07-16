import React from 'react';

class FormsWallet extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="valor">
          Valor:
          <input
            name="valor"
            type="number"
          />
        </label>
        <label htmlFor="descricao">
          Descrição:
          <input
            name="descricao"
            type="text"
          />
        </label>
        <label htmlFor="moeda">
          Moeda:
          <select id="moeda">
            <option value="vazio">Testando</option>
          </select>
        </label>
        <label htmlFor="metodo-de-pagamennto">
          Método de pagamento:
          <select>
            <options value="dinheiro">Dinheiro</options>
            <options value="cartao-de-credito">Cartão de crédito</options>
            <options value="cartao-de-debito">Cartão de Débito</options>
          </select>
        </label>
        <label htmlFor="categoria">
          Tag
          <select>
            <options value="alimentacao">Alimentação</options>
            <options value="lazer">Lazer</options>
            <options value="trabalho">Trabalho</options>
            <options value="transporte">Transporte</options>
            <options value="saude">Saúde</options>
          </select>
        </label>
      </form>
    );
  }
}

export default FormsWallet;
