// Coloque aqui suas actions

export const GET_EMAIL = 'GET_EMAIL'; // Action responsável por salvar o input email.
export const GET_CURRENCIES_SUCCESS = 'GET_CURRENCIES_SUCCESS'; // Requisição com sucesso;
export const GET_CURRENCIES_ERROR = 'GET_CURRENCIES_ERROR'; // Requisição com fracasso.
export const GET_EXPENSE = 'GET_EXPENSE';

export const getEmail = (email) => ({ type: GET_EMAIL, email });

export const getCurrenciesSucess = (payload) => (
  { type: GET_CURRENCIES_SUCCESS,
    payload }
);
export const getCurrenciesError = (error) => (
  { type: GET_CURRENCIES_ERROR,
    payload: error }
);

// Ajuda do colega Lima Lima Lima para ajustar minha função fetch 😂
// Ela fará com que, se houver sucesso na chamada faça dispatch no results, se houver erro faça dispatch no erro.
export function fetchApiCurrencies() {
  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((r) => r.json()
      .then((json) => dispatch(getCurrenciesSucess(Object.keys(json))),
        (error) => dispatch(getCurrenciesError(error))));
}

// Action responsável por jogar uma nova expense para a store.
export const getExpense = (payload) => (
  { type: GET_EXPENSE,
    payload }
);
