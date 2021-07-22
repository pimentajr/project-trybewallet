const INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
    isLoading: true,
    fetchSucess: false,
    errorMesage: null,
  },
};

export default INITIAL_STATE;
