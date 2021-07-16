import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const requestCurrencies = () => ({ type: 'REQUEST_CURRENCIES' });
const requestCurrentCurrencyPrices = () => ({ type: 'REQUEST_CURRENCIES_PRICES' });
const receiveCurrencies = (currencies) => ({ type: 'RECEIVE_CURRENCIES', currencies });
const receiveCurrenciesPrices = (currenciesPrices) => ({
  type: 'RECEIVE_CURRENCIES_PRICES',
  currenciesPrices,
});

class Wallet extends React.Component {
  componentDidMount() {
    const { makeEventRequestCurrencies, dispatcher } = this.props;
    dispatcher(makeEventRequestCurrencies());
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

  renderCurrency(handleCurrency, currencies) {
    return (
      <label htmlFor="currency">
        Moeda
        <select
          role="combobox"
          id="currency"
          onChange={ (event) => handleCurrency(event.target.value) }
        >
          {currencies && Object.values(currencies)
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

  renderHeader(email, totalValue) {
    return (
      <div>
        Header
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">{totalValue}</p>
        <p data-testid="header-currency-field"> BRL </p>
      </div>);
  }

  renderValue(handleValue) {
    return (
      <label htmlFor="input-value">
        Valor
        <input
          id="input-value"
          type="text"
          onChange={ (event) => handleValue(event.target.value) }
        />
      </label>
    );
  }

  renderDescription(handleDescription) {
    return (
      <label htmlFor="description">
        Descrição
        <input
          id="description"
          type="text"
          onChange={ (event) => handleDescription(event.target.value) }
        />
      </label>
    );
  }

  renderAddExpense(buildFunctionToHandleAddExpense, dispatcher) {
    return (
      <button
        type="button"
        onClick={ buildFunctionToHandleAddExpense(dispatcher) }
      >
        Adicionar despesa
      </button>
    );
  }

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
      expenses,
      dispatcher,
    } = this.props;

    const valuesInBrl = expenses.map((expense) => {
      const currencyRate = expense.exchangeRates[expense.currency];
      return expense.value * currencyRate.ask; // valor em Brasileirinhos
    });

    const totalValueInBrl = valuesInBrl.reduce((acc, cv) => acc + cv, 0);

    return (
      <div>
        {
          /* Essas funções não precisam de bind porque elas não passam
          o this para o callback
          Aqui eu não preciso porque o this não é passado para ninguem
          caso utiliza-se onClick={} seria nescessario pois estou pasando this para onClick
          https://tableless.com.br/react-this-bind-so-sei-que-assim/
          */
        }
        {this.renderHeader(email, totalValueInBrl)}
        <form>
          {this.renderValue(handleValue)}
          {this.renderDescription(handleDescription)}
          {this.renderCurrency(handleCurrency, currencies, value)}
          {this.renderSelectPaymentMethod(handleMethod)}
          {this.renderSelectTag(handleTag)}
          {this.renderAddExpense(dispatcher, buildFunctionToHandleAddExpense)}
        </form>
        {}
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
    // Solução baseada em: https://github.com/reduxjs/react-redux/issues/255#issuecomment-259512261
    // Não entendi a necessidade disso!
    myDispatcher(requestCurrencies());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => myDispatcher(receiveCurrencies(currencies)));
  };
}

function buildAddExpenseFunction(myDispatcher) {
  return () => {
    myDispatcher(requestCurrentCurrencyPrices());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => myDispatcher(receiveCurrenciesPrices(currencies)));
  };
}

const mapDispatchToProps = (dispatcher) => ({
  makeEventRequestCurrencies: requestCurrenciesAndDispatchReceiveCurrencies,
  dispatcher,
  handleDescription: (descrip) => dispatcher({ type: 'SAVED_DESCRIPTION', descrip }),
  handleValue: (value) => dispatcher({ type: 'SAVED_VALUE', value }),
  handleCurrency: (currency) => dispatcher({ type: 'SAVED_CURRENCY', currency }),
  handleMethod: (method) => dispatcher({ type: 'SAVED_METHOD', method }),
  handleTag: (tag) => dispatcher({ type: 'SAVED_TAG', tag }),
  buildFunctionToHandleAddExpense: buildAddExpenseFunction,
});

Wallet.propTypes = {
  buildFunctionToHandleAddExpense: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf(PropTypes.object).isRequired,
  currency: PropTypes.shape({ code: PropTypes.string, codein: PropTypes.string })
    .isRequired,
  dispatcher: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  exchangeRates: PropTypes.shape({ filter: PropTypes.func }).isRequired,
  expenses: PropTypes.shape({ map: PropTypes.func }).isRequired,
  handleCurrency: PropTypes.func.isRequired,
  handleDescription: PropTypes.func.isRequired,
  handleMethod: PropTypes.func.isRequired,
  handleTag: PropTypes.func.isRequired,
  handleValue: PropTypes.func.isRequired,
  makeEventRequestCurrencies: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
