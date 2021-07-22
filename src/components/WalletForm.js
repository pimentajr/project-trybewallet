import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAddExpense } from '../actions/wallet';

class WalletForm extends React.Component {
  constructor() {
    super();
    this.state = {
      currenciesArray: [],
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.fetchCurrencies = this.fetchCurrencies.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setValue = this.setValue.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.setCurrency = this.setCurrency.bind(this);
    this.setMethPag = this.setMethPag.bind(this);
    this.setTag = this.setTag.bind(this);
    this.setExpense = this.setExpense.bind(this);
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  setValue() {
    const { value } = this.state;
    return (
      <label htmlFor="valor">
        Valor
        <input
          id="valor"
          type="number"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  setDescription() {
    const { description } = this.state;
    return (
      <label htmlFor="descrição">
        Descrição
        <input
          id="descrição"
          type="text"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  setCurrency() {
    const { currenciesArray, currency } = this.state;
    return (
      <label htmlFor="moeda">
        Moeda
        <select
          id="moeda"
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
        >
          { Object.keys(currenciesArray).map((coin) => (
            <option value={ coin.code } key={ coin }>{ coin }</option>)) }
        </select>
      </label>

    );
  }

  setMethPag() {
    const { method } = this.state;
    return (
      <label htmlFor="metodo-de-pagamento">
        Método de pagamento
        <select
          id="metodo-de-pagamento"
          name="method"
          value={ method }
          onChange={ this.handleChange }
        >
          <option>Dinheiro</option>
          <option>Cartão de débito</option>
          <option>Cartão de crédito</option>
        </select>
      </label>

    );
  }

  setTag() {
    const { tag } = this.state;
    return (
      <label htmlFor="tag">
        Tag
        <select id="tag" name="tag" value={ tag } onChange={ this.handleChange }>
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="transporte">transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }

  setExpense() {
    const { sendExpense } = this.props;
    const newExpenses = { ...this.state };
    delete newExpenses.currenciesArray;
    sendExpense(newExpenses);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async fetchCurrencies() {
    const fetchApi = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(fetchApi);
    const moneyCode = await response.json();
    delete moneyCode.USDT;
    this.setState({ currenciesArray: moneyCode });
  }

  render() {
    return (
      <form>
        {this.setValue()}
        {this.setDescription()}
        {this.setCurrency()}
        {this.setMethPag()}
        {this.setTag()}
        <button
          type="button"
          name="adicionar-despesa"
          onClick={ this.setExpense }
        >
          Adicionar Despesa
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendExpense: (expense) => dispatch(fetchAddExpense(expense)),
});

const mapStateToProps = (state) => ({
  chave: state,
});

WalletForm.propTypes = {
  sendExpense: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
