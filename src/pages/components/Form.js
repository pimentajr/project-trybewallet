import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import currenciesApi from '../../services/index';
import { sendCurrencies, requestExpenses } from '../../actions/index';
import CategoryForm from './CategoryForm';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      currencies: [],
      // expenses: [],
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      paymentMethod: 'Dinheiro',
      category: 'Alimentação',
    };
    this.returnApi = this.returnApi.bind(this);
    this.handleInputs = this.handleInputs.bind(this);
    this.submitExpenses = this.submitExpenses.bind(this);
  }

  componentDidMount() {
    this.returnApi();
  }

  async returnApi() {
    const callCoin = await currenciesApi();
    const filteredCoin = Object.keys(callCoin).filter((coin) => coin !== 'USDT');
    const { sendCurrenciesToStore } = this.props;
    sendCurrenciesToStore(filteredCoin);
    this.setState({ currencies: filteredCoin });
  }

  handleInputs({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
    // console.log(event.target.name);
  }

  submitExpenses() {
    const { requestExpensesData } = this.props;
    const {
      id,
      value,
      description,
      currency,
      paymentMethod,
      category,
    } = this.state;
    const expenses = {
      id,
      value,
      description,
      currency,
      method: paymentMethod,
      tag: category,
    };
    requestExpensesData(expenses);
    this.setState((prevState) => ({ id: prevState.id + 1 }));
  }

  render() {
    const {
      currencies,
    } = this.state;

    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input type="number" name="value" id="value" onChange={ this.handleInputs } />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            name="description"
            id="description"
            onChange={ this.handleInputs }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select name="currency" id="currency" onChange={ this.handleInputs }>
            { currencies.map((coin, index) => (
              <option key={ index }>
                { coin }
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="paymentMethod" onChange={ this.handleInputs }>
          Método de pagamento:
          <select name="paymentMethod" id="paymentMethod">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <CategoryForm onChangeOption={ this.handleInputs } />
        <button
          name="button"
          type="button"
          onClick={ () => this.submitExpenses() }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendCurrenciesToStore: (currencies) => dispatch(sendCurrencies(currencies)),
  requestExpensesData: (expense) => dispatch(requestExpenses(expense)),

});

Form.propTypes = {
  requestExpensesData: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(null, mapDispatchToProps)(Form);
