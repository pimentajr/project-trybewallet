export const LOGIN = 'LOGIN';
const register = (payload) => ({
  type: LOGIN,
  payload,
});

export const newExpense = (state, json) => ({
  type: 'NEW_EXPENSE',
  state,
  payload: json,
});

export const reqCurrencies = () => ({ type: 'REQUEST_CURR' });

export const fetchCurrency = (state) => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  return (dispatch) => {
    dispatch(reqCurrencies());
    return fetch(url)
      .then((r) => r.json()
        .then(
          (json) => dispatch(newExpense(state, json)),
        ));
  };
};

export default {
  register,
  newExpense,
  fetchCurrency,
};
