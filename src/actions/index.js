export const responseApi = () => ({ type: 'REQUEST_API', payload: { isFetching: true } });

export const Api = (apiDados) => ({
  type: 'REQUEST_API_SUCCESS',
  payload: {
    moedas: Object.keys(apiDados),
    isFetching: false,
  },
});

export const fetchApi = () => (dispatch) => {
  dispatch(requestApi());
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((currencies) => {
      const Object = currencies;
      delete Object.USDT;
      dispatch(requestApiSuccess(Object));
    });
};

export const saveExpense = (expense) => (dispatch) => {
  dispatch(requestApi());
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then(
      (sucesso) => {
        const aux = sucesso;
        delete aux.USDT;
        return dispatch({
          type: 'SALVAR_DESPESA',
          payload: { ...expense, exchangeRates: sucesso },
        });
      },
    );
};

export const deleteExpense = (newStateExpenses) => ({
  type: 'DELETE_EXPENSE',
  payload: newStateExpenses,
});
