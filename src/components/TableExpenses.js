import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class TableExpenses extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
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
        { expenses.map(({
          id, value,
          description,
          currency,
          method, tag,
          exchangeRates,
        }) => (
          <tbody key={ id }>
            <tr>
              <td>{ description }</td>
              <td>{ tag }</td>
              <td>{ method }</td>
              <td>{ value }</td>
              <td>{ currency }</td>
              <td>{ Number(exchangeRates[currency].ask).toFixed(2) }</td>
              <td>
                {
                  (Number(exchangeRates[currency].ask) * Number(value))
                    .toFixed(2)
                }
              </td>
              <td>Real</td>
              <td>{ exchangeRates[currency].name }</td>
              <td>
                <button type="button">Editar</button>
              </td>
            </tr>
          </tbody>
        )) }
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

TableExpenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(TableExpenses);
