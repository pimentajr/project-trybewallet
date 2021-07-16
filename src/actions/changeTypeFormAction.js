import { CHANGE_TYPE_FORM } from '.';

const changeTypeFormAction = (type, id) => ({
  type: CHANGE_TYPE_FORM,
  payload: {
    typeForm: type,
    id,
  },
});

export default changeTypeFormAction;
