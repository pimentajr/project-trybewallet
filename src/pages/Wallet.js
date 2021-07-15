import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, addExpenses, fetchExchangeRates, updateEdition }
  from '../actions';
import Table from './Table';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.renderValue = this.renderValue.bind(this);
    this.renderDescription = this.renderDescription.bind(this);
    this.renderCurrency = this.renderCurrency.bind(this);
    this.renderPaymentMethod = this.renderPaymentMethod.bind(this);
    this.renderTag = this.renderTag.bind(this);
    this.submitButton = this.submitButton.bind(this);
    this.sendEditionButton = this.sendEditionButton.bind(this);
  }

  componentDidMount() {
    const { fetchCurrency } = this.props;
    fetchCurrency();
  }

  handleChange(e) {
    const { target: { name, value } } = e;
    this.setState({
      [name]: value,
    });
  }

  // Lógica explicada por Guilherme Pereira e José Henrique Margraf Melo
  async handleSubmit(e) {
    e.preventDefault();
    const { fetchExchangeRate } = this.props;
    await fetchExchangeRate();
    const { newExpenses, expenses, rawData } = this.props;
    const lastExpense = expenses[expenses.length - 1];
    this.setState({
      id: lastExpense ? lastExpense.id + 1 : 0,
      exchangeRates: rawData,
    }, () => { newExpenses(this.state); });
  }

  submitButton() {
    return (
      <button type="submit" onClick={ this.handleSubmit }>Adicionar despesa</button>
    );
  }

  sendEditionButton() {
    const { sendEdition } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const editedKeys = { value, description, currency, method, tag };
    return (
      <button
        type="button"
        onClick={ (e) => {
          e.preventDefault();
          sendEdition(editedKeys);
        } }
      >
        Editar despesa
      </button>
    );
  }

  renderValue() {
    const { value } = this.state;
    return (
      <label htmlFor="expenseInput">
        Valor
        <input
          type="number"
          id="expenseInput"
          data-testid="value-input"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderDescription() {
    const { description } = this.state;
    return (
      <label htmlFor="expenseDescription">
        Descrição
        <textarea
          id="expenseDescription"
          data-testid="description-input"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderCurrency() {
    const { currencyList, isEditing } = this.props;
    const { currency } = this.state;
    return (
      <label htmlFor="currency">
        Moeda
        <select
          id="currency"
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
          disabled={ isEditing }
        >
          { currencyList.map((c, index) => <option key={ index }>{c}</option>) }
        </select>
      </label>
    );
  }

  renderPaymentMethod() {
    const { method } = this.state;
    return (
      <label htmlFor="payment-method">
        Método de pagamento
        <select
          id="payment-method"
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ this.handleChange }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </label>
    );
  }

  renderTag() {
    const { tag } = this.state;
    return (
      <label htmlFor="tag">
        Tag
        <select
          data-testid="tag-input"
          id="tag"
          name="tag"
          value={ tag }
          onChange={ this.handleChange }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </label>
    );
  }

  render() {
    const { email, expenses, isEditing } = this.props;

    const totalExpenses = expenses
      .map((ex) => Number(ex.value) * Number(ex.exchangeRates[ex.currency].ask))
      .reduce((acc, expense) => {
        acc += expense;
        return acc;
      }, 0);

    return (
      <div>
        <header>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">{ totalExpenses }</p>
          <select data-testid="header-currency-field">
            <option>BRL</option>
          </select>
        </header>

        <form>
          { this.renderValue() }
          { this.renderDescription() }
          { this.renderCurrency() }
          { this.renderPaymentMethod() }
          { this.renderTag() }

          { !isEditing
            ? this.submitButton()
            : this.sendEditionButton() }
          <Table />
        </form>
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencyList: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  fetchCurrency: PropTypes.func.isRequired,
  newExpenses: PropTypes.func.isRequired,
  expenses: PropTypes.shape(PropTypes.any).isRequired,
  rawData: PropTypes.shape(PropTypes.any).isRequired,
  fetchExchangeRate: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  sendEdition: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencyList: state.wallet.currencies,
  expenses: state.wallet.expenses,
  rawData: state.wallet.rawData,
  isEditing: state.wallet.isOnEdition,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrency: () => dispatch(fetchCurrencies()),
  newExpenses: (payload) => dispatch(addExpenses(payload)),
  fetchExchangeRate: (payload) => dispatch(fetchExchangeRates(payload)),
  sendEdition: (payload) => dispatch(updateEdition(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
