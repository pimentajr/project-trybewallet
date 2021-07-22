export const responseApi = () => ({ type: 'REQUEST_API', payload: { isFetching: true } });

export const responseSuccess = (apiDados) => ({
  type: 'REQUEST_API_SUCCESS',
  payload: {
    moedas: Object.keys(apiDados),
    isFetching: false,
  },
});

export const fetchApi = () => (dispatch) => {
  dispatch(responseApi());
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((currencies) => {
      const object = currencies;
      delete object.USDT;
      dispatch(responseSuccess(object));
    });
};

export const save = (expense) => (dispatch) => {
  dispatch(responseApi());
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
