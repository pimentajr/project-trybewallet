import React, { Component } from 'react';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      currencies: [],
      id: '0',
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
    this.fetchCurrencies = this.fetchCurrencies.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  handleChange({ target: { id, value } }) {
    this.setState({
      [id]: value,
    });
  }

  async fetchCurrencies() {
    await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((response) => this.setState({
        currencies: Object.keys(response),
      }));
  }

  render() {
    const { currencies } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor
            <input type="number" id="value" onChange={ this.handleChange } />
          </label>
          <label htmlFor="description">
            Descrição
            <input type="text" id="description" onChange={ this.handleChange } />
          </label>
          <label htmlFor="currency">
            Moeda
            <select id="currency" onChange={ this.handleChange }>
              {currencies.map((currency) => (
                currency === 'USDT' ? null
                  : (<option key={ currency }>{currency}</option>)
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento
            <select id="method" onChange={ this.handleChange }>
              <option key="Dinheiro">Dinheiro</option>
              <option key="Cartão de crédito">Cartão de crédito</option>
              <option key="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag
            <select id="tag" onChange={ this.handleChange }>
              <option key="Alimentação">Alimentação</option>
              <option key="Lazer">Lazer</option>
              <option key="Trabalho">Trabalho</option>
              <option key="Transporte">Transporte</option>
              <option key="Saúde">Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

export default Form;
