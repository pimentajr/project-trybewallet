const STORE_USER_EMAIL = 'STORE_USER_EMAIL';

const userEmail = (email) => ({
  type: STORE_USER_EMAIL,
  email,
});

export default userEmail;
