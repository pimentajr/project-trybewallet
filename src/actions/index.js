// Coloque aqui suas actions
export const REQUEST_API = 'REQUEST_API';
export const GET_PICTURE = 'GET_PICTURE';
export const SING_IN = 'SING_IN';

export const requestAPI = () => ({ type: REQUEST_API });

export const getPicture = (data) => ({ type: GET_PICTURE, data });

export function fetchAPI() {
  // Desenvolva aqui o código da action assíncrona
//   return (dispatch) => {
//     return fetch("https://aws.random.cat/meow")
//     .then((r) => r.json()
//     .then(
//       (json) => dispatch(getPicture(json)),
//       (error) => dispatch(requestAPI(error)),
//     ));
//   };
}
