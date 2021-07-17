const initialState = {
  currencies: [],
  expenses: [],
};

export default function wallet(state = initialState, action) {
  switch (action.type) {
    case "WALLET_SET_CURRENCIES":
      return { ...state, currencies: action.payload };
    default:
      return state;
  }
}
