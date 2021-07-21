async function fetchAPI() {
  const API = await fetch('https://economia.awesomeapi.com.br/json/all');
  const results = API.json();
  return results;
}

export default fetchAPI;
