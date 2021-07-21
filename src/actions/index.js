export const USER_NAME = 'USER_NAME';
export const USER_PASS = 'USER_PASS';

export const USER_COIN_SUCESS = 'USER_COIN_SUCESS';
export const USER_COIN_ERROR = 'USER_COIN_ERROR';

export const ADD_USER_SPENDING = 'ADD_USER_SPENDING';
export const SET_COIN_ALL = 'SET_COIN_ALL';

export const setUsername = (payload) => ({
  type: USER_NAME,
  payload,
});

export const setUserPass = (payload) => ({
  type: USER_PASS,
  payload,
});

export const userCoinSucess = (payload) => ({
  type: USER_COIN_SUCESS,
  payload,
});

export const setCoinAll = (payload) => ({
  type: SET_COIN_ALL,
  payload,
});

export const userCoinError = (payload) => ({
  type: USER_COIN_ERROR,
  payload,
});

export const addUserSpending = (payload) => ({
  type: ADD_USER_SPENDING,
  payload,
});

export const getCoinThunk = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const results = await response.json();
    dispatch(userCoinSucess(results));
  } catch (error) {
    dispatch(userCoinError(error));
  }
};

export const setCoinThunk = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const results = await response.json();
    dispatch(setCoinAll(results));
  } catch (error) {
    dispatch(userCoinError(error));
  }
};
