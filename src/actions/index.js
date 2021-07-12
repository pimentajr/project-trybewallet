export const SET_USER = 'SET_USER';
export const SET_WALLET = 'SET_WALLET';
export const CONNECT_WALLET = 'CONNECT_WALLET';

export const setUser = (payload) => ({ type: SET_USER, payload });
export const setWallet = (payload) => ({ type: SET_WALLET, payload });
export const connectWallet = () => ({ type: CONNECT_WALLET });

export const fetchCoins = () => (dispatch) => (
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => dispatch(setWallet(data)))
    .catch(console.error)
);
