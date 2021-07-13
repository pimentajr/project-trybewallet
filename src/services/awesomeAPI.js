// const getAwesomeAPI = async () => {
//   const url = fetch('https://economia.awesomeapi.com.br/json/all');
//   const [infoCurrency] = await Promise.all([url]);
//   const dataCurrency = await infoCurrency.json();
//   return dataCurrency;
//   };

// export default getAwesomeAPI
const getAwesomeAPI = () => (
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export default getAwesomeAPI;
