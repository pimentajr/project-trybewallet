export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const removeExpense = (index) => ({
  type: REMOVE_EXPENSE,
  payload: index,
});
