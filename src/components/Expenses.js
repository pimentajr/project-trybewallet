import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Expenses extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <tr>
          <th key="Descrição">Descrição</th>
          <th key="Tag">Tag</th>
          <th key="Método de pagamento">Método de pagamento</th>
          <th key="Valor">Valor</th>
          <th key="Moeda">Moeda</th>
          <th key="Câmbio utilizado">Câmbio utilizado</th>
          <th key="Valor convertido">Valor convertido</th>
          <th key="Moeda de conversão">Moeda de conversão</th>
          <th key="Editar/Excluir">Editar/Excluir</th>
        </tr>
        {expenses.map((expense) => {
          const { description, tag, method,
            value, currency, exchangeRates, id } = expense;
          const exchangeRate = Number(exchangeRates[currency].ask);
          const convertedValue = (exchangeRate * Number(value)).toFixed(2);
          const currencyName = exchangeRates[currency].name.split('/')[0];
          return (
            <tr key={ id }>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{value}</td>
              <td>{currencyName}</td>
              <td>{exchangeRate.toFixed(2)}</td>
              <td>{convertedValue}</td>
              <td>Real</td>
            </tr>
          );
        })}
      </table>
    );
  }
}

Expenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Expenses);
