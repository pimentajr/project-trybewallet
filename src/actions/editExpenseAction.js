import { EDIT_EXPENSE } from '.';

const editExpenseAction = (form) => ({
  type: EDIT_EXPENSE,
  payload: form,
});

export default editExpenseAction;
