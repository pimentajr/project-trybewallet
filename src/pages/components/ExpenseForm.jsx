import React from 'react';

class ExpenseForm extends React.Component {
  constructor() {
    super();

    this.state = {
      currencys: [],
    };
  }

  async componentDidMount() {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const allCurrencys = await response.json();
    const currencys = Object.keys(allCurrencys).filter((currency) => {
      const lenght = 3;
      return currency.length <= lenght;
    });

    this.setCurrencysOnState(currencys);
  }

  setCurrencysOnState(arr) {
    this.setState({ currencys: arr });
  }

  render() {
    const { currencys } = this.state;

    return (
      <form>
        <label htmlFor="money-value">
          Valor
          <input type="number" id="money-value" />
        </label>

        <label htmlFor="describe">
          Descrição
          <input type="text" id="describe" />
        </label>

        <label htmlFor="currency">
          Moeda
          <select id="currency">
            {currencys.map((item, index) => (
              <option key={ index }>{item}</option>
            ))}
          </select>
        </label>

        <label htmlFor="pay-method">
          Método de pagamento
          <select id="pay-method">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>

        </label>

        <label htmlFor="tag">
          tag
          <select id="tag">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>

      </form>
    );
  }
}

export default ExpenseForm;
