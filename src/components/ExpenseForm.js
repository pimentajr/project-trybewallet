import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense } from '../actions';

class ExpenseForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };

    this.inputChange = this.inputChange.bind(this);
  }

  inputChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  createOptions(array) {
    return (
      array.map((string) => <option key={ string } value={ string }>{string}</option>)
    );
  }

  async requestCurrencies() {
    const URL = 'https://economia.awesomeapi.com.br/json/all';
    try {
      const response = await fetch(URL);
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  }

  async updateExchangeRates() {
    const rates = await this.requestCurrencies();
    this.setState({
      exchangeRates: rates,
    });

    const { adicionarDespesa } = this.props;
    adicionarDespesa(this.state);

    const { id } = this.state;
    const nextId = id + 1;

    this.setState({
      id: nextId,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      exchangeRates: {},
    });
  }

  createAddExpenseButton() {
    return (
      <button
        type="button"
        onClick={ () => this.updateExchangeRates() }
      >
        Adicionar despesa
      </button>
    );
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const methodTypes = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tagTypes = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    return (
      <form className="expense-form">
        <label htmlFor="v">
          Valor
          <input
            id="v"
            name="value"
            type="number"
            value={ value }
            onChange={ this.inputChange }
          />
        </label>
        <label htmlFor="c">
          Moeda
          <select id="c" name="currency" value={ currency } onChange={ this.inputChange }>
            {this.createOptions(currencies)}
          </select>
        </label>
        <label htmlFor="p">
          Método de pagamento
          <select id="p" name="method" value={ method } onChange={ this.inputChange }>
            {this.createOptions(methodTypes)}
          </select>
        </label>
        <label htmlFor="t">
          Tag
          <select id="t" name="tag" value={ tag } onChange={ this.inputChange }>
            {this.createOptions(tagTypes)}
          </select>
        </label>
        <label htmlFor="d">
          Descrição
          <input
            id="d"
            name="description"
            type="text"
            value={ description }
            onChange={ this.inputChange }
          />
        </label>
        {this.createAddExpenseButton()}
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.string,
  ),
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  adicionarDespesa: (payload) => dispatch(addExpense(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
