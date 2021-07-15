const newUser = (state) => ({ type: 'NEW_USER', state });
export default newUser;
export const ADDExpense = (state) => ({ type: 'ADD_Expense', state });

const resolveApi = (payload) => ({
  type: 'FETCH-API',
  payload,
});

export function fetchApiRequest() {
  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((response) => dispatch(resolveApi(response)));
}
