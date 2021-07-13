export const newUser = (state) => ({ type: 'NEW_USER', state });

export const newExpense = (state, json) => ({
  type: 'NEW_EXPENSE',
  state,
  payload: json,
});

export const reqCurrencies = () => ({ type: 'REQUEST_CURR' });

export const reqFailed = (error) => ({ type: 'FAILED_REQUEST', payload: error });

export const fetchCurrency = (state) => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  return (dispatch) => {
    dispatch(reqCurrencies());
    return fetch(url)
      .then((r) => r.json()
        .then(
          (json) => dispatch(newExpense(state, json)),
          (error) => dispatch(reqFailed(error)),
        ));
  };
};

export default {
  newUser,
  newExpense,
  fetchCurrency,
};
