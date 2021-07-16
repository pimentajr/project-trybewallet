// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const FETCH_STARTED = 'FETCH_STARTED';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_ERROR = 'FETCH_ERROR';
export const SEND_EXPENSE = 'SEND_EXPENSE';

export function login(payload) {
  return {
    type: LOGIN,
    payload,
  };
}

export const fetchStarted = () => ({
  type: FETCH_STARTED,
});

export const fetchSuccess = (payload) => ({
  type: FETCH_SUCCESS,
  payload,
});

export const fetchError = (payload) => ({
  type: FETCH_ERROR,
  payload,
});

export const sendExpense = (payload) => ({
  type: SEND_EXPENSE,
  payload,
});

// feito com o auxilio do Bruno Duarte
export const fetchApi = () => async (dispatch) => {
  try {
    dispatch(fetchStarted());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const responseJSON = await response.json();
    return dispatch(fetchSuccess(responseJSON));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

export const fetchExchangeRates = (Obj) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const responseJSON = await response.json();
  Obj.exchangeRates = responseJSON;
  return dispatch(sendExpense(Obj));
};
