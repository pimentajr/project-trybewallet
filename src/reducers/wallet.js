// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

function handleValue(state, action) {
  state.newExpense.value = action.value;
  return { ...state };
}

function handleRequestCurrenciesPrices(state) {
  return { ...state };
}

function handleReceiveCurrenciesPrices(state, action) {
  state.newExpense.exchangeRates = action.currenciesPrices;
  state.newExpense.id = state.count;
  state.count += 1;
  state.expenses.push(state.newExpense);
  state.newExpense = {};
  return { ...state };
}

function handleDescription(state, action) {
  state.newExpense.description = action.descrip;
  return { ...state };
}

function handleCurrency(state, action) {
  state.newExpense.currency = action.currency;
  return { ...state };
}

function handleMethod(state, action) {
  state.newExpense.method = action.method;
  return { ...state };
}

function handleTag(state, action) {
  state.newExpense.tag = action.tag;
  return { ...state };
}

function handleReceiveCurrencies(state, action) {
  const newState = { ...state };
  newState.currencies = action.currencies;
  return newState;
}

function handleRequestCurrencies(state) {
  const newState = { ...state };
  return newState;
}

const eventHandlerMap = {
  RECEIVE_CURRENCIES: handleReceiveCurrencies,
  REQUEST_CURRENCIES: handleRequestCurrencies,
  RECEIVE_CURRENCIES_PRICES: handleReceiveCurrenciesPrices,
  REQUEST_CURRENCIES_PRICES: handleRequestCurrenciesPrices,
  SAVED_DESCRIPTION: handleDescription,
  SAVED_VALUE: handleValue,
  SAVED_CURRENCY: handleCurrency,
  SAVED_METHOD: handleMethod,
  SAVED_TAG: handleTag,
};

export default function wallet(state, action) {
  const handler = eventHandlerMap[action.type];
  if (handler) {
    return handler(state, action);
  }

  // initial state
  return {
    currencies: {},
    expenses: [],
    newExpense: {},
    count: 0,
  };
}
