const INNITIAL_STATE = {
  description: 'market bill',
  price: 120,
  currency: 'USD',
  tag: 'Food',
  payment_method: 'cash',
};

export default function wallet(state = INNITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_EXPENSE':
    return {
      ...state,
      description: 'cine tickets',
      price: 33,
      currency: 'USD',
      tag: 'Leisure',
      payment_method: 'credit card',
    };
  default:
    return INNITIAL_STATE;
  }
}
