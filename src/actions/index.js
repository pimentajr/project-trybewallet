export const USER_NAME = 'USER_NAME';
export const USER_PASS = 'USER_PASS';

export const USER_COIN = 'USER_COIN';
export const USER_COIN_SUCESS = 'USER_COIN_SUCESS';
export const USER_COIN_ERROR = 'USER_COIN_ERROR';

export const USER_ID = 'USER_ID';
export const ADD_USER_SPENDING = 'ADD_USER_SPENDING';
export const USER_VALUE = 'USER_VALUE';
export const USER_DESCRIPTION = 'USER_DESCRIPTION';
export const USER_COIN_TYPE = 'USER_COIN_TYPE';
export const USER_PAY = 'USER_PAY';
export const USER_TAG = 'USER_TAG';

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

export const userCoinError = (payload) => ({
  type: USER_COIN_ERROR,
  payload,
});

export const addUserSpending = (payload) => ({
  type: ADD_USER_SPENDING,
  payload,
});

export const setUserId = () => ({
  type: USER_ID,
});

export const setUserValue = (valor) => ({
  type: USER_VALUE,
  payload: valor,
});

export const setUserDescription = (payload) => ({
  type: USER_DESCRIPTION,
  payload,
});

export const setUserCoin = (payload) => ({
  type: USER_COIN_TYPE,
  payload,
});

export const setUserPay = (payload) => ({
  type: USER_PAY,
  payload,
});

export const setUserTag = (payload) => ({
  type: USER_TAG,
  payload,
});

export const getCoinThunk = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const results = await response.json();
    console.log(results);
    dispatch(userCoinSucess(results));
  } catch (error) {
    dispatch(userCoinError(error));
  }
};
