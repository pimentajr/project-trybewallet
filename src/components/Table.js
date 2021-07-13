import React, { Component } from 'react';
import '../css/table.css';
import PropTypes from 'prop-types';
import Editbutton from './Editbutton';
import Removebutton from './Removebutton';

class Table extends Component {
  getAsk(rates, currency) {
    return JSON.parse(rates[currency].ask);
  }

  roundCurrency(rates, currency) {
    const askValue = this.getAsk(rates, currency);
    return Math.round((askValue + Number.EPSILON) * 100) / 100;
  }

  currencyName(rates, currency) {
    const rateName = rates[currency].name;
    const popName = rateName.split('/').shift();
    return popName;
  }

  convertedValue(rates, currency, value) {
    const actualCurrency = this.getAsk(rates, currency);
    const convertedValue = value * actualCurrency;
    return Math.round((convertedValue + Number.EPSILON) * 100) / 100;
  }

  render() {
    const { expenses } = this.props;
    return (
      <table className="table-container">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(({
            description,
            tag, method,
            value,
            exchangeRates,
            currency,
          }, index) => (
            <tr key={ index }>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{value}</td>
              <td>{this.currencyName(exchangeRates, currency)}</td>
              <td>{this.roundCurrency(exchangeRates, currency)}</td>
              <td>{this.convertedValue(exchangeRates, currency, value)}</td>
              <td>Real</td>
              <td>
                <Editbutton />
                <Removebutton index={ index } />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Table;
