// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// import { fetchEconomia } from '../actions';

const INITIAL_STATE = {
  currencies: {},
  expenses: [],
  newExpense: {},
  count: 0,
};

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

// eslint-disable-next-line complexity
export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'RECEIVE_CURRENCIES':
    return handleReceiveCurrencies(state, action);
  case 'REQUEST_CURRENCIES':
    return handleRequestCurrencies(state); // Por que preciso desse evento?
  case 'RECEIVE_CURRENCIES_PRICES':
    return handleReceiveCurrenciesPrices(state, action);
  case 'REQUEST_CURRENCIES_PRICES':
    return handleRequestCurrenciesPrices(state); // Por que preciso desse evento?
  case 'SAVED_DESCRIPTION':
    return handleDescription(state, action);
  case 'SAVED_VALUE':
    return handleValue(state, action);
  case 'SAVED_CURRENCY':
    return handleCurrency(state, action);
  case 'SAVED_METHOD':
    return handleMethod(state, action);
  case 'SAVED_TAG':
    return handleTag(state, action);
  default:
    return state;
  }
}
