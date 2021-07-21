import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getPrice from '../service';
import { addExpense } from '../actions';

const initialState = {
  currencies: [],
  cost: '',
  description: '',
  method: 'Dinheiro',
  tag: 'Alimentação',
  currency: 'USD',
};
const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
const mapSelects = (element) => (
  (element !== 'USDT') && (
    <option value={ element }>{ element }</option>)
);

class ExpenseForm extends React.Component {
  constructor() {
    super();
    this.state = initialState;
    this.addCurrencies = this.addCurrencies.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitButton = this.submitButton.bind(this);
  }

  componentDidMount() {
    this.addCurrencies();
  }

  async addCurrencies() {
    const currencies = Object.keys(await getPrice());
    this.setState({ currencies });
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  async submitButton() {
    const { cost, description, method, tag, currency } = this.state;
    const { newExpense, expenses } = this.props;
    const currencies = await getPrice();
    const obj = {
      id: expenses.length,
      description,
      tag,
      method,
      value: cost,
      currency,
      exchangeRates: currencies,
    };
    this.setState({
      cost: '',
      description: '',
      method: '',
      tag: '',
      currency: '',
    });
    newExpense(obj);
  }

  render() {
    const { currencies, cost, description, method, tag, currency } = this.state;
    return (
      <form>
        <label htmlFor="inputCost">
          Valor:
          <input
            name="cost"
            type="number"
            id="inputCost"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="inputCurrency">
          Moeda:
          <select id="inputCurrency" name="currency" onClick={ this.handleChange }>
            {currencies.map(mapSelects)}
          </select>
        </label>
        <label htmlFor="inputMethod">
          Método de pagamento:
          <select id="inputMethod" name="method" onClick={ this.handleChange }>
            {methods.map(mapSelects)}
          </select>
        </label>
        <label htmlFor="inputTag">
          Tag:
          <select id="inputTag" name="tag" value={ tag } onClick={ this.handleChange }>
            {tags.map(mapSelects)}
          </select>
        </label>
        <label htmlFor="inputDescription">
          Descrição:
          <input
            id="inputDescription"
            name="description"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="reset"
          disabled={ !(currencies && cost && description && method && tag && currency) }
          onClick={ this.submitButton }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  newExpense: (email) => dispatch(addExpense(email)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

ExpenseForm.propTypes = {
  newExpense: PropTypes.func.isRequired,
  expenses: PropTypes.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
