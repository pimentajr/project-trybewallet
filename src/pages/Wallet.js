import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Solução baseada em: https://github.com/reduxjs/react-redux/issues/255#issuecomment-259512261

const requestCurrencies = () => ({
  type: 'REQUEST_CURRENCIES',
});

const requestCurrentCurrencyPrices = () => ({
  type: 'REQUEST_CURRENCIES_PRICES',
});

const receiveCurrenciesPrices = (currenciesPrices) => ({
  type: 'RECEIVE_CURRENCIES_PRICES',
  currenciesPrices,
});

const receiveCurrencies = (currencies) => ({
  type: 'RECEIVE_CURRENCIES',
  currencies,
});

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    // this.findCurrencyPrice = this.findCurrencyPrice.bind(this);
  }

  componentDidMount() {
    const { requestCurrienciesProps, dispatcher } = this.props;
    dispatcher(requestCurrienciesProps());
  }

  renderSelectTag(handleTag) {
    return (
      <label htmlFor="tag">
        Tag
        <select
          role="combobox"
          id="tag"
          onChange={ (event) => handleTag(event.target.value) }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>

        </select>
      </label>
    );
  }

  renderSelectPaymentMethod(handleMethod) {
    return (
      <label htmlFor="payment-method">
        Método de Pagamento
        <select
          role="combobox"
          id="payment-method"
          onChange={ (event) => handleMethod(event.target.value) }
        >
          <option value="Dinheiro"> Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  renderCurrency(handleCurrency, currencies, value) {
    return (
      <label htmlFor="currency">
        Moeda
        <select
          role="combobox"
          id="currency"
          onChange={ (event) => handleCurrency(event.target.value) }
        >
          {currencies
            && Object.values(currencies)
              .filter((currency) => currency.codein !== 'BRLT')
              .map((currency) => (
                <option value={ currency.code } key={ currency.code }>
                  {currency.code}
                </option>
              ))}
        </select>
      </label>
    );
  }

  renderExpenses(expenses) {
    return expenses
      .map((expense) => {
        const { exchangeRates, ...quaseTudo } = expense;
        return { ...quaseTudo };
      })
      .map((expense) => (<span key={ expenses.id }>{JSON.stringify(expense)}</span>));
  }

  // eslint-disable-next-line max-lines-per-function
  render() {
    const {
      email,
      currencies,
      handleDescription,
      handleValue,
      handleCurrency,
      handleMethod,
      handleTag,
      buildFunctionToHandleAddExpense,
      value,
      id,
      description,
      method,
      tag,
      currency,
      expenses,
      dispatcher,
    } = this.props;

    const totalValue = expenses
      .map((expense) => {
        const currencyRate = expense.exchangeRates[expense.currency];
        return expense.value * currencyRate.ask;
      })
      .reduce((acc, cv) => acc + cv, 0);
    return (
      <div>
        Header
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">{totalValue}</p>
          <p data-testid="header-currency-field"> BRL </p>
        </header>
        =============
        <br />
        <form>
          <label htmlFor="input-value">
            Valor
            <input
              id="input-value"
              type="text"
              onChange={ (event) => {
                handleValue(event.target.value);
              } }
            />
          </label>
          <br />
          <label htmlFor="description">
            Descrição
            <input
              id="description"
              type="text"
              value={ description }
              onChange={ (event) => handleDescription(event.target.value) }
            />
          </label>
          <br />
          {this.renderCurrency(handleCurrency, currencies, value)}
          <br />

          {this.renderSelectPaymentMethod(handleMethod)}
          <br />

          {this.renderSelectTag(handleTag)}
          <br />

          <button
            type="button"
            onClick={ buildFunctionToHandleAddExpense(dispatcher) }
          >
            Adicionar despesa
          </button>
        </form>
        <p>
          {id}
          <br />
          {description}
          <br />
          {value}
          <br />
          {currency}
          <br />
          {method}
          <br />
          {tag}
        </p>
        {this.renderExpenses(expenses)}

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const newExpense = state.wallet.newExpense || {}; // Isso não afeta o estado, mas evita que falhe caso
  return {
    email: state.user.email,
    currencies: state.wallet.currencies,
    value: newExpense.value,
    id: newExpense.id,
    description: newExpense.description,
    currency: newExpense.currency,
    method: newExpense.method,
    tag: newExpense.tag,
    exchangeRates: newExpense.exchangeRates,
    expenses: state.wallet.expenses,
  };
};

function requestCurrenciesAndDispatchReceiveCurrencies() {
  return (myDispatcher) => {
    // Não entendi a necessidade disso!
    myDispatcher(requestCurrencies());

    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => myDispatcher(receiveCurrencies(currencies)));
  };
}

function buildAddExpenseFunction(myDispatcher) {
  return () => {
    // Não entendi a necessidade disso!
    myDispatcher(requestCurrentCurrencyPrices());

    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => myDispatcher(receiveCurrenciesPrices(currencies)));
  };
}

const mapDispatchToProps = (dispatcher) => ({
  requestCurrienciesProps: requestCurrenciesAndDispatchReceiveCurrencies,
  dispatcher,
  handleDescription: (descrip) => dispatcher({ type: 'SAVED_DESCRIPTION', descrip }),
  handleValue: (value) => dispatcher({ type: 'SAVED_VALUE', value }),
  handleCurrency: (currency) => dispatcher({ type: 'SAVED_CURRENCY', currency }),
  handleMethod: (method) => dispatcher({ type: 'SAVED_METHOD', method }),
  handleTag: (tag) => dispatcher({ type: 'SAVED_TAG', tag }),
  buildFunctionToHandleAddExpense: buildAddExpenseFunction,
});

Wallet.propTypes = {
  buildFunctionToHandleAddExpense: PropTypes.func,
  currencies: PropTypes.objectOf(PropTypes.object).isRequired,
  currency: PropTypes.shape({
    code: PropTypes.any,
    codein: PropTypes.string,
  }),
  description: PropTypes.any,
  dispatcher: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  exchangeRates: PropTypes.shape({
    filter: PropTypes.func,
  }),
  expenses: PropTypes.shape({
    map: PropTypes.func,
  }),
  handleAddExpense: PropTypes.func,
  handleCurrency: PropTypes.any,
  handleDescription: PropTypes.func,
  handleMethod: PropTypes.any,
  handleTag: PropTypes.any,
  handleValue: PropTypes.func,
  id: PropTypes.any,
  method: PropTypes.any,
  requestCurrienciesProps: PropTypes.func.isRequired,
  tag: PropTypes.any,
  value: PropTypes.any,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
