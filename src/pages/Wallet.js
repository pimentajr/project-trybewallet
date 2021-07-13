import React from 'react';
import '../css/wallet.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchCurrencyAPI from '../services/fetchAPI';
import { submitCurrencies } from '../actions/submitCurrencies';
import { submitActionExpenses } from '../actions/submitExpenses';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.handleChanges = this.handleChanges.bind(this);
    this.fetchCurrency = this.fetchCurrency.bind(this);
  }

  componentDidMount() {
    this.currencyAPI();
  }

  handleChanges({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async currencyAPI() {
    const { submitCurrency } = this.props;
    const data = await fetchCurrencyAPI();
    const arrayCurrency = Object.keys(data).filter((currency) => currency !== 'USDT');
    submitCurrency(arrayCurrency);
  }

  async fetchCurrency() {
    const { submitExpense } = this.props;
    const data = await fetchCurrencyAPI();
    delete data.USDT;
    submitExpense(this.state, data);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  trueValue() {
    const { expenses } = this.props;
    const arrayOfValues = expenses.map((expense) => {
      const { currency, exchangeRates, value } = expense;
      const ratesArray = Object.values(exchangeRates);
      const objFound = ratesArray.find((item) => (item.code === currency ? item : null));
      const endValue = Math.round((value * objFound.ask + Number.EPSILON) * 100) / 100;
      return endValue;
    });
    return arrayOfValues.reduce((acc, curr) => acc + curr, 0);
  }

  renderValueInput() {
    const { value } = this.state;
    return (
      <label htmlFor="expenses-input">
        Valor
        <input
          type="text"
          id="expenses-input"
          data-type="currency"
          placeholder="R$0.00"
          name="value"
          value={ value }
          onChange={ (event) => this.handleChanges(event) }
        />
      </label>
    );
  }

  renderDescriptionInput() {
    const { description } = this.state;
    return (
      <label htmlFor="description-input">
        Descrição
        <textarea
          id="description-input"
          name="description"
          rows="1"
          value={ description }
          onChange={ (event) => this.handleChanges(event) }
        />
      </label>
    );
  }

  renderCurrencyInput() {
    const { array } = this.props;
    return (
      <label htmlFor="currency-select">
        Moeda
        <select
          name="currency"
          id="currency-select"
          onChange={ (event) => this.handleChanges(event) }
        >
          {array.map((currency, index) => (
            <option key={ index }>{currency}</option>
          ))}
        </select>
      </label>
    );
  }

  renderPaymentMethodInput() {
    return (
      <label htmlFor="payment">
        Método de pagamento
        <select
          id="payment"
          name="method"
          onChange={ (event) => this.handleChanges(event) }
        >
          <option label="Dinheiro" value="Dinheiro">
            Dinheiro
          </option>
          <option label="Cartão de crédito" value="Cartão de crédito">
            Cartão de crédito
          </option>
          <option label="Cartão de débito" value="Cartão de débito">
            Cartão de débito
          </option>
        </select>
      </label>
    );
  }

  renderTag() {
    return (
      <label htmlFor="expense">
        Tag
        <select
          id="expense"
          name="tag"
          onChange={ (event) => this.handleChanges(event) }
        >
          <option label="Alimentação" value="Alimentação">
            Alimentação
          </option>
          <option label="Lazer" value="Lazer">
            Lazer
          </option>
          <option label="Trabalho" value="Trabalho">
            Trabalho
          </option>
          <option label="Transporte" value="Transporte">
            Transporte
          </option>
          <option label="Saúde" value="Saúde">
            Saúde
          </option>
        </select>
      </label>
    );
  }

  render() {
    const { email, expenses } = this.props;
    return (
      <div className="wallet-page">
        <header className="header-container">
          <p className="email" data-testid="email-field">
            {email}
          </p>
          <p data-testid="total-field">{this.trueValue()}</p>
          <p className="currency" data-testid="header-currency-field">
            BRL
          </p>
        </header>
        <form className="form-container">
          <fieldset className="fieldset-container">
            {this.renderValueInput()}
            {this.renderDescriptionInput()}
            {this.renderCurrencyInput()}
            {this.renderPaymentMethodInput()}
            {this.renderTag()}
          </fieldset>
        </form>
        <button
          className="add-button"
          type="button"
          onClick={ () => this.fetchCurrency() }
        >
          Adicionar despesa
        </button>
        <Table expenses={ expenses } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  array: state.wallet.currencies,
  totalValue: state.wallet.expenses,
  email: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  submitCurrency: (arrayMoedas) => dispatch(submitCurrencies(arrayMoedas)),
  submitExpense: (state, exchange) => dispatch(submitActionExpenses(state, exchange)),
});

Wallet.propTypes = {
  array: PropTypes.arrayOf(PropTypes.string).isRequired,
  submitCurrency: PropTypes.func.isRequired,
  submitExpense: PropTypes.func.isRequired,
  map: PropTypes.func,
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Wallet.defaultProps = {
  map: () => console.log('map function'),
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
