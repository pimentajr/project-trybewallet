export const GET_STATE = 'GET_STATE';

export const getState = (payload, test) => ({
  type: GET_STATE,
  payload,
  test,
});
