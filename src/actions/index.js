const NEW_EXPENSE = 'NEW_EXPENSE';
const newUser = (state) => ({ type: 'NEW_USER', state });
export default newUser;
export const addNewExpense = (expense) => ({
  type: NEW_EXPENSE,
  expense,
});

export const fetchAPIExpense = (expense) => async (dispatch) => {
  const URL = 'https://economia.awesomeapi.com.br/json/all';

  const fetchAPI = await fetch(URL);
  const parseJSON = await fetchAPI.json();

  dispatch(addNewExpense({
    ...expense,
    exchangeRates: parseJSON,
  }));
};

const resolveApi = (payload) => ({
  type: 'FETCH-API',
  payload,
});

export function fetchApiRequest() {
  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((response) => dispatch(resolveApi(response)));
}
