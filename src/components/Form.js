import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { newExpenses } from '../actions';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      currencies: [],
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
    };
    this.fetchCurrencies = this.fetchCurrencies.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addExpenses = this.addExpenses.bind(this);
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

  async addExpenses(action) {
    const resultado = await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((response) => response);
    const { id, value, description, currency, method, tag } = this.state;
    const objectExpense = {
      id, value, description, currency, method, tag, exchangeRates: resultado,
    };
    await action(objectExpense);
    const newID = id + 1;
    this.setState({
      id: newID,
    });
  }

  render() {
    const { currencies } = this.state;
    const { sendExpense } = this.props;
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
          <button type="button" onClick={ () => this.addExpenses(sendExpense) }>Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendExpense: (obj) => dispatch(newExpenses(obj)),
});

Form.propTypes = {
  sendExpense: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Form);
