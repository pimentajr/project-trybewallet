export default async function requisitionCoinsApi() {
  const Api = await fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json());
  delete Api.USDT;
  return Api;
}
