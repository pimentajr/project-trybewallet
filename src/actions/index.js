// Coloque aqui suas actions

export default function fetchEconomia() {
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((payload) => dispatch((payload)));
}
