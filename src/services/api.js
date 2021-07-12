const URL = 'https://economia.awesomeapi.com.br/json/all';

const fetchAPI = async () => {
  const raw = await fetch(URL);
  const data = await raw.json();
  return data;
};

export default fetchAPI;
