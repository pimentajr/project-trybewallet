const API_COINS = 'https://economia.awesomeapi.com.br/json/all';

const getCoinsAPI = () => (
  fetch(API_COINS)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export default getCoinsAPI;
