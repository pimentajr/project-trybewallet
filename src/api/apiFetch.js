const fetchAPI = async () => {
  const api = await fetch('https://economia.awesomeapi.com.br/json/all');
  const apiJSON = await api.json();
  return apiJSON;
};

export default fetchAPI;
