import React from 'react';
import Header from '../components/header';
import fetchAPI from '../services/index';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      currency: [],
    };

    this.renderCurrency = this.renderCurrency.bind(this);
  }

  componentDidMount() {
    this.renderCurrency();
  }

  async renderCurrency() {
    const currencies = await fetchAPI();
    const filterUsd = Object.keys(currencies).filter((coin) => coin !== 'USDT');
    await this.setState({
      currency: filterUsd,
    });
  }

  render() {
    const { currency } = this.state;
    return (
      <main>
        <Header />
        <form>
          <label htmlFor="name">
            nome:
            <input type="text" name="name" id="name" />
          </label>
          <label htmlFor="valor">
            Valor
            <input type="number" name="valor" id="valor" />
          </label>
          <label htmlFor="Descrição">
            Descrição:
            <input type="text" name="Descrição" id="Descrição" />
          </label>
          <label htmlFor="Moeda" type="combobox">
            Moeda:
            <select name="Moeda" id="Moeda">
              { currency.map((coin, index) => (<option key={ index }>{ coin }</option>)) }
            </select>
          </label>
          <label htmlFor="metodo">
            Método de pagamento:
            <select name="metodo" id="metodo">
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="despesa">
            Tag:
            <select name="despesa" id="despesa">
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button name="button" type="submit">Confirmar</button>
        </form>
      </main>
    );
  }
}

export default Wallet;
