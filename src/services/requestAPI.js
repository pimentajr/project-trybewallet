const requestAPI = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const values = await response.json();
  return values;
};

export default requestAPI;
