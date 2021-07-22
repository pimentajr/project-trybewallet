async function currenciesApi() {
  const coinsApi = await fetch('https://economia.awesomeapi.com.br/json/all');
  const response = await coinsApi.json();
  return response;
}

export default currenciesApi;
