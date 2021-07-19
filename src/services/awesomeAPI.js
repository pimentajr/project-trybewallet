function aweasomeAPI() {
  fetch('https://economia.awesomeapi.com.br/json/all', { method: 'GET' })
    .then((response) => (!response.ok
      ? new Error(`Requisição falhou com erro: ${response.status} - ${response.text}`)
      : response.json()));
}

export default aweasomeAPI;
