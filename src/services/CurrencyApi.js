const ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';

async function fetchApi() {
  try {
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    delete data.USDT;
    return data;
  } catch (error) {
    return error;
  }
}

export default fetchApi;
