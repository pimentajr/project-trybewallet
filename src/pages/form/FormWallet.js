import React, { Component } from 'react';

class FormWallet extends Component {
  constructor() {
    super();
    this.state = {
      moedas: {},
    };
  }

  componentDidMount() {
    this.requisitionMoedasApi();
  }

  async requisitionMoedasApi() {
    const Api = await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json());
    delete Api.USDT;
    this.setState({ moedas: Api });
    this.listMoedas();
  }

  listMoedas() {
    const { moedas } = this.state;
    console.log(Object.keys(moedas));
  }

  render() {
    const { moedas } = this.state;
    return (
      <form>
        <label htmlFor="Valor">
          Valor
          <input
            type="text"
            id="Valor"
          />
        </label>
        <label htmlFor="Descrição">
          Descrição
          <input
            type="text"
            id="Descrição"
          />
        </label>
        <label htmlFor="Moeda">
          Moeda
          <select id="Moeda">
            {Object.keys(moedas).map((coin, index) => (
              <option key={ index } value={ coin }>{coin}</option>
            ))}
          </select>
        </label>
        <label htmlFor="Método de pagamento">
          Método de pagamento
          <select id="Método de pagamento">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="Tag">
          Tag
          <select id="Tag">
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

export default FormWallet;
