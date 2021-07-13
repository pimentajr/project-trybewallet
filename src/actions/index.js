export const STORE_EMAIL = 'STORE_EMAIL';
export const RECEIVED_DATA = 'RECEIVED_DATA';

export const addEmail = (email) => ({ type: STORE_EMAIL, email });
export const getCurrencyData = (currencies) => ({ type: RECEIVED_DATA, currencies });
// export const exchangeRate = (exchangeRate) => ({type: GET_EXCHANGE_RATE, exchangeRate })

export const fetchCurrencies = () => (
  async (dispatch) => {
    try {
      const fetchResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
      const currencies = await fetchResponse.json();
      return dispatch(getCurrencyData(currencies));
    } catch (error) {
      return console.log(error);
    }
  }
);
