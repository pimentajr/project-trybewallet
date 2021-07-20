async function getPrice(key = 'all') {
  const fetchAPI = await fetch(`https://economia.awesomeapi.com.br/json/${key}`);
  const json = fetchAPI.json();
  return json;
}

export default getPrice;
