import getAPI from '../services/API';
import { LOADING, SUCCESS, FAIL } from './index';

const loading = () => ({
  type: LOADING,
});

const success = (payload) => ({
  type: SUCCESS,
  payload,
});

const fail = (payload) => ({
  type: FAIL,
  payload,
});

const fetchCoins = () => async (dispatch) => {
  dispatch(loading());
  try {
    const funcgetAPI = await getAPI();
    dispatch(success(Object.keys(funcgetAPI)));
  } catch (error) {
    dispatch(fail(error));
  }
  dispatch(loading());
};

export default fetchCoins;
