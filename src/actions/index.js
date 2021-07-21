export const USER_INFO = 'USER_INFO';
export const sendInfo = (payload) => ({ type: USER_INFO, payload });

/* export const sendInfo = (payload) => ({ type: USER_INFO, payload }); */
/* export const USER_INFO = 'USER_INFO';
export const REQUEST_SUCESS = 'REQUEST_SUCESS';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';

export const currencyApiRequest = (payload) => ({ type: REQUEST_SUCESS, payload });

export const fetchApi = () => (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((response) => response.json())
  .then((data) => dispatch(currencyApiRequest(data)));
 */
