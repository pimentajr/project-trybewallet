import * as Types from './actionTypes';
import { currencyAPI } from '../api/currencyAPI';

export const requestAPI = () => ({ type: Types.REQUEST });

export const getData = (data) => ({
  type: Types.GET_DATA,
  payload: data,
 });

export const requestError = (error) => ({
  type: Types.REQUEST_ERROR,
  payload: error,
});

export const fetchAPI = () => async (dispatch) => {
    dispatch(requestAPI());
    try {
        const data = await currencyAPI();
        return dispatch(getData(data));
    } catch (error) {
        return dispatch(requestError(error));
    }
};