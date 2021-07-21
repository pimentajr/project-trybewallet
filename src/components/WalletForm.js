import React from 'react';

class WalletForm extends React.Component {
  constructor() {
    super();
    this.state = {
      moedas: [],
    };
    this.fetchMoedas = this.fetchMoedas.bind(this);
  }

  componentDidMount() {
    this.fetchMoedas();
  }

  async fetchMoedas() {
    const fetchApi = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(fetchApi);
    const moneyCode = await response.json();
    delete moneyCode.USDT;
    this.setState({ moedas: moneyCode });
  }

  render() {
    const { moedas } = this.state;
    return (
      <form>
        <label htmlFor="valor">
          Valor
          <input id="valor" type="number" name="valor" />
        </label>
        <label htmlFor="descrição">
          Descrição
          <input id="descrição" type="text" name="descrição" />
        </label>
        <label htmlFor="moeda">
          Moeda
          <select id="moeda" name="moeda">
            { Object.keys(moedas).map((moeda) => (
              <option value={ moeda.code } key={ moeda }>{ moeda }</option>)) }
          </select>
        </label>
        <label htmlFor="metodo-de-pagamento">
          Método de pagamento
          <select id="metodo-de-pagamento" name="metodo-de-pagamento">
            <option value="dinheiro">Dinheiro</option>
            <option value="cartão-debito">Cartão de débito</option>
            <option value="cartao-credito">Cartão de crédito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select id="tag" name="tag">
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="transporte">transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

      </form>
    );
  }
}

export default WalletForm;
