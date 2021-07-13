import axios from 'axios';

export const SET_FORM = 'SET_FORM';
export const SUBMIT_EXPENSES = 'SUBMIT_EXPENSES';
export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';
const URL = 'https://economia.awesomeapi.com.br/json/all';

export const setForm = (inputForm) => ({
  type: SET_FORM,
  payload: inputForm,
});

export const submitExpenses = (payload) => ({
  type: SUBMIT_EXPENSES,
  payload,
});

const fetchCurrencies = (payload) => ({
  type: FETCH_CURRENCIES,
  payload,
});

export function getCurrencies() {
  return (dispatch) => {
    axios.get(URL)
      .then((response) => {
        const { data } = response;
        delete data.USDT;
        console.log(data);
        dispatch(fetchCurrencies(data));
      })
      .catch((err) => console.log(err));
  };
}
