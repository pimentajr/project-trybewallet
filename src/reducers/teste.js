const expenses = [1, 2, 3, 4]
const editedExpense = { id: 2 }

function filterExpenses(expenses, editedExpense) {
  const newExpenses = expenses.map((expense, index) => {
    if (index === editedExpense.id) {
      return editedExpense
    }
    return expense
  });
  return newExpenses;
}

console.log(filterExpenses(expenses, editedExpense));