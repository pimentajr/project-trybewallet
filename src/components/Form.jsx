import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenses } from '../actions';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
      method: 'Cartão de crédito',
      tag: 'Lazer',
      id: 0,
      exchangeRates: {},
      currency: 'USD',
      currencies: [],
    };
    this.fetchCurrency = this.fetchCurrency.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.fetchCurrency();
  }

  async fetchAPI() {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await request.json();
    return data;
  }

  async fetchCurrency() {
    // const { exchangeRates } = this.state;
    const data = await this.fetchAPI();
    const objKeys = Object.keys(data);
    const currencies = objKeys.filter((currency) => currency !== 'USDT');
    this.setState({
      exchangeRates: data,
      currencies,
    });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    this.fetchCurrency();
    const objForm = this.state;
    const { exchangeRates, currency } = this.state;
    console.log(currency, exchangeRates);
    delete objForm.currencies;
    let { id } = this.state;
    const { dispatchExpenses } = this.props;
    dispatchExpenses(objForm);
    this.setState({
      id: id += 1,
    });
  }

  inputExpenses() {
    const { value, description } = this.state;
    return (
      <section>
        <label htmlFor="value">
          Valor:
          <input
            id="value"
            type="number"
            min="9"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            id="description"
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
      </section>
    );
  }

  inputCurrency() {
    const { currencies } = this.state;
    return (
      <section>
        <label htmlFor="currencies">
          Moeda:
          <select id="currencies" name="currency" onChange={ this.handleChange }>
            {currencies && currencies.map((currency, index) => (
              <option
                key={ index }
                value={ currency }
                data-testid={ currency }
              >
                {currency}
              </option>
            ))}
          </select>
        </label>
      </section>
    );
  }

  inputMethodyPayment() {
    const { method } = this.state;
    console.log(method);
    return (
      <section>
        <label htmlFor="method">
          Método de pagamento:
          <select
            id="method"
            name="method"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
      </section>
    );
  }

  inputCategory() {
    const { tag } = this.state;
    return (
      <section>
        <label htmlFor="category">
          Tag
          <select id="category" name="tag" value={ tag } onChange={ this.handleChange }>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </section>
    );
  }

  render() {
    return (
      <form action="POST">
        {this.inputExpenses()}
        {this.inputCurrency()}
        {this.inputMethodyPayment()}
        {this.inputCategory()}
        <button type="button" onClick={ this.handleClick }>Adicionar despesas</button>
      </form>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchExpenses: (payload) => dispatch(addExpenses(payload)),
});

export default connect(null, mapDispatchToProps)(Form);

Form.propTypes = {
  dispatchExpenses: PropTypes.func,
}.isRequired;
