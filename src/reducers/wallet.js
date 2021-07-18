const initialState = {
  nextId: 0,
  currencies: [],
  expenses: [],
};

export default function wallet(state = initialState, action) {
  switch (action.type) {
    case "WALLET_SET_CURRENCIES":
      return { ...state, currencies: action.payload };
    case "WALLET_CREATE_EXPENSE":
      return {
        ...state,
        nextId: state.nextId + 1,
        expenses: [...state.expenses, { ...action.payload, id: state.nextId }],
      };
    default:
      return state;
  }
}
