export const EMAIL_TO_STATE = 'EMAIL_TO_STATE';
export const FETCH_API = 'FETCH_API';

export const emailToState = (email) => ({
  type: EMAIL_TO_STATE,
  email,
});

// export const fetchApi = (coinOptions) => ({
//   type: FETCH_API,
//   coinOptions,
// });

// export const currenciesApi = () => (dispatch) => (
//   fetch('https://economia.awesomeapi.com.br/json/all')
//     .then((response) => response.json())
//     .then((coinOptions) => dispatch(fetchApi(coinOptions))));
