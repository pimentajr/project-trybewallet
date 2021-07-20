export default function calculateTotalExpenses(expenses) {
  return expenses
    .reduce((acc,
      cv) => Number(acc) + Number(cv.value * cv.exchangeRates[cv.currency].ask),
    0).toFixed(2);
}
