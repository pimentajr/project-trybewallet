import React from 'react';

class FormsWallet extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="valor">
          Valor:
          <input name="valor" type="number" id="valor" />
        </label>
        <label htmlFor="descricao">
          Descrição:
          <input name="descricao" type="text" id="descricao" />
        </label>
        <label htmlFor="moeda">
          Moeda:
          <select>
            <option value="dinheiro">Dinheiro</option>
          </select>
        </label>
        <label htmlFor="metodo-de-pagamento">
          Método de pagamento:
          <select id="metodo-de-pagamento">
            <options value="dinheiro">Dinheiro</options>
            <options value="cartao-de-credito">Cartão de crédito</options>
            <options value="cartao-de-debito">Cartão de débito</options>
          </select>
        </label>
        <label htmlFor="categoria">
          Tag
          <select id="categoria">
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
