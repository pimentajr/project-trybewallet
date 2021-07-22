const INITIAL_STATE = {
  editForm: false,
  currency: 'BRL',
  currencies: [],
  error: '',
  expenses: [],
  editableObj: null,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  default:
    return state;
  }
}

export default wallet;
