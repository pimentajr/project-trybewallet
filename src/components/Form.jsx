import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenses } from '../actions';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      expensesValue: 0,
      descrition: '',
      payment: '',
      tag: '',
      id: 0,
      // exchangeRates: {},
      // currency: 'USD',
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
      // exchangeRates: data,
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
    const objForm = this.state;
    let { id } = this.state;
    const { dispatchExpenses } = this.props;
    dispatchExpenses(objForm);
    this.setState({
      id: id += 1,
    });
  }

  inputExpenses() {
    const { expensesValue, descrition } = this.state;
    return (
      <section>
        <label htmlFor="value">
          Valor:
          <input
            id="value"
            type="number"
            min="9"
            name="expensesValue"
            value={ expensesValue }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="descrition">
          Descrição:
          <input
            id="descrition"
            type="text"
            name="descrition"
            value={ descrition }
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
          Moedas:
          <select id="currencies" name="currency" onChange={ this.handleChange }>
            {currencies.map((currency, index) => (
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
    const { payment } = this.state;
    return (
      <section>
        <label htmlFor="payment">
          Método de pagamento:
          <select
            id="payment"
            name="payment"
            value={ payment }
            onChange={ this.handleChange }
          >
            <option value="dinheiro">
              Dinheiro
            </option>
            <option value="cartao-de-credito">
              Cartão de crédito
            </option>
            <option value="cartao-de-debito">
              Cartão de débito
            </option>
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
          Selecione uma categoria:
          <select id="category" name="tag" value={ tag } onChange={ this.handleChange }>
            <option value="alimentacao">
              Alimentação
            </option>
            <option value="lazer">
              Lazer
            </option>
            <option value="trabalho">
              Trabalho
            </option>
            <option value="transporte">
              Transporte
            </option>
            <option value="saude">
              Saúde
            </option>
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
