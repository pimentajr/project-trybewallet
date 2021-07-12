// Coloque aqui suas actions

export const GET_EMAIL = 'GET_EMAIL'; // Action responsável por salvar o input email.
export const GET_CURRENCIES = 'GET_CURRENCIES'; // Action para fazer requisição na API.
export const GET_CURRENCIES_SUCCESS = 'GET_CURRENCIES_SUCCESS'; // Requisição com sucesso;
export const GET_CURRENCIES_ERROR = 'GET_CURRENCIES_ERROR'; // Requisição com fracasso.

export const getEmail = (email) => ({ type: GET_EMAIL, email });

export const getCurrencies = (array) => ({ type: GET_CURRENCIES, array });

const getCurrenciesSucess = (payload) => ({ type: GET_CURRENCIES_SUCCESS, payload });

const getCurrenciesError = (error) => ({ type: GET_CURRENCIES_ERROR, payload: error });

export function fetchApiCurrencies() {
  return (dispatch) => {
    dispatch(getCurrencies());
    return fetch('https://dog.ceo/api/breeds/image/random')
      .then((r) => r.json()
        .then(
          (json) => dispatch(getCurrenciesSucess(json)),
          (error) => dispatch(getCurrenciesError(error)),
        ));
  };
}

// export const fetchApiCurrencies = async (dispatch) => {
//   dispatch(getCurrencies());
//   try {
//     const response = await fetch('https://economia.awesomeapi.com.br/json/all');
//     const results = await response.json();
//     dispatch(getCurrenciesSucess(results));
//   } catch (error) {
//     dispatch(getCurrenciesError(error));
//   }
// }; // Se houver sucesso faça dispatch no results, se houver erro faça dispatch no erro.
