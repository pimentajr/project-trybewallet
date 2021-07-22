const setAPI = async () => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const results = await response.json();
    return results;
  } catch (error) {
    return error;
  }
};

export default setAPI;
