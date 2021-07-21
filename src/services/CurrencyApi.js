const apiEndPoint = 'https://economia.awesomeapi.com.br/json/all';

async function fetchApi() {
  try {
    const response = await fetch(apiEndPoint);
    const data = await response.json();
    delete data.USDT; // nem imaginava isso , marcos mantovani- t11 que me ensinou
    return data;
  } catch (error) {
    return error;
  }
}

export default fetchApi;
