// Coloque aqui sus actions
// Criando action creator provisório, apenas estrutura

export default function salvaEmail(state) {
  return {
    type: 'ADD_EMAIL',
    email: state,
  };
}

// Indica como a action será chamada
const requestCoin = () => ({
  type: 'REQUEST_COIN',
});

// Indicando que além de chamada, a action tem retorno - Payload que é parâmetro
const requestCoinSuccess = (payload) => ({
  type: 'REQUEST_COIN_SUCCESS',
  payload,
});

export const salvaDespesa = (state, payload) => ({
  type: 'RESPONSE_PARAM',
  state,
  payload,
});

// Verifica se há algo no state
export const fetchMoeda = (state = false) => (dispatch) => {
  dispatch(requestCoin());
  return fetch('https://economia.awesomeapi.com.br/json/all')
    // pega o objeto da API e transforma em.json
    .then((result) => result.json())
    // levar os dados -data- para o meu payload retornando-os (o state ou data, de acordo com o q houver no state)
    .then((data) => (state ? dispatch(salvaDespesa(state, data))
      : dispatch(requestCoinSuccess(data))));
};
