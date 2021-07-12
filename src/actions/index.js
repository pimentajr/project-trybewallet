const STORE_USER_EMAIL = 'STORE_USER_EMAIL';
const STORE_CURRENCIES = 'STORE_CURRENCIES';

const userEmail = (email) => ({
  type: STORE_USER_EMAIL,
  email,
});

const walletCurrencies = (currencies) => ({
  type: STORE_CURRENCIES,
  currencies,
});

// const email = Parse.Object.extend(userEmail);
// const walletCur = Parse.Object.extend(walletCurrencies);

export default userEmail;
