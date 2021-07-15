export const GET_STATE = 'GET_STATE';

export const getState = (payload, test, button) => ({
  type: GET_STATE,
  payload,
  test,
  button,
});
