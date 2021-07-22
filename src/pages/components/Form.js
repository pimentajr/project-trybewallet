import React, { Component } from 'react';
import currenciesApi from '../../services/index';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      currency: [],
    };
    this.returnApi = this.returnApi.bind(this);
  }

  componentDidMount() {
    this.returnApi();
  }

  async returnApi() {
    const callCoin = await currenciesApi();
    const filteredCoin = Object.keys(callCoin).filter((coin) => coin !== 'USDT');
    this.setState({ currency: filteredCoin });
  }

  render() {
    const {
      currency,
    } = this.state;

    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input type="number" name="value" id="value" />
        </label>
        <label htmlFor="description">
          Descrição:
          <input type="text" name="description" id="description" />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select name="currency" id="currency">
            { currency.map((coin, index) => (
              <option key={ index }>
                { coin }
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="payment_method">
          Método de pagamento:
          <select name="payment_method" id="payment_method">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="category">
          Tag:
          <select name="category" id="category">
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

export default Form;
