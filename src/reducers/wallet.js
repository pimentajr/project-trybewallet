// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INICIAL_STATE = {
  currencies: [],
  loading: false,
};

const wallet = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case 'FETCH_MOEDAS':
    return {
      ...state,
      loading: true,
    };

  case 'FETCH_SUCESS':
    return {
      ...state,
      currencies: Object.keys(action.payload).filter((sigla) => sigla !== 'USDT'),
      loading: false,
    };
  default: return state;
  }
};
export default wallet;
