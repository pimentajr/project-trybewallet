export default function calculateTotalExpenses(expenses) {
  const zero = 0;
  return expenses.length > 0
    ? expenses
      .reduce((acc,
        cv) => Number(acc) + Number(cv.value * cv.exchangeRates[cv.currency].ask),
      0).toFixed(2) : zero.toFixed(2);
}

/* export default function calculateTotalExpenses(expenses) {
  const total = expenses
    .reduce((acc,
      cv) => Number(acc) + Number(cv.value * cv.exchangeRates[cv.currency].ask),
    0).toFixed(2) || 0;
  return new Intl.NumberFormat('pt-BR',
    { style: 'currency', currency: 'BRL' }).format(total);
} */
