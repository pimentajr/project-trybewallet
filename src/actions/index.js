export const EMAIL_ACTION = 'EMAIL_ACTION';
export const REQUEST_API = 'REQUEST_MOVIES';
export const RECEIVE_API = 'RECEIVE_API_ACTION';
export const RECEIVE_NEW_ITEM = 'RECEIVE_NEW_ITEM';
export const UPDATE_TOTAL = 'UPDATE_TOTAL';
export const REMOVE_ITEM = 'REMOVE_ITEM';

export const sendEmail = (state) => ({
  type: EMAIL_ACTION,
  state,
});

export const requestAPI = () => ({
  type: REQUEST_API,
});

export const receiveAPI = (state) => ({
  type: RECEIVE_API,
  state,
});

export const receiveNewItem = (state) => ({
  type: RECEIVE_NEW_ITEM,
  state,
});

export const updateTotal = (state) => ({
  type: UPDATE_TOTAL,
  state,
});

export const removeItem = (state) => ({
  type: REMOVE_ITEM,
  state,
});

export function fetchAPI() {
  return async (dispatch) => {
    dispatch(requestAPI());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((value) => dispatch(receiveAPI(value)));
  };
}
