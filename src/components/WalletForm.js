import React from 'react';

class WalletForm extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="valor">
          Valor
          <input type="number" name="valor" />
        </label>
        <label htmlFor="descrição">
          Descrição
          <input type="text" name="descrição" />
        </label>
        <label htmlFor="moeda">
          Moeda
          <select name="moeda">
            <option value="vazio">Vazio</option>
          </select>
        </label>
        <label htmlFor="metodo-de-pagamento">
          Método de pagamento
          <select name="metodo-de-pagamento">
            <option value="dinheiro">Dinheiro</option>
            <option value="cartão-debito">Cartão de débito</option>
            <option value="cartao-credito">Cartão de crédito</option>
          </select>
        </label>
      </form>
    );
  }
}

export default WalletForm;
