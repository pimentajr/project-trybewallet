import { DELETE_EXPENSE } from '.';

const deleteExpenseAction = (expense) => ({
  type: DELETE_EXPENSE,
  payload: {
    expense,
  },
});

export default deleteExpenseAction;
