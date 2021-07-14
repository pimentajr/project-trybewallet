import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
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
        <tbody>
          {expenses.map((expense, index) => {
            const { description, tag, method, value, currency, exchangeRates } = expense;
            const { name, ask } = exchangeRates[currency];
            return (
              <tr key={ index }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{value}</td>
                <td>{name}</td>
                {/* https://www.alura.com.br/artigos/convertendo-string-para-numero-em-javascript?gclid=CjwKCAjw87SHBhBiEiwAukSeUbG_d76otYedhoyV_q_1liD3jyHVdgfmxyHxw4bK6pJO7KNd7f-cVhoC0eQQAvD_BwE */}
                <td>{parseFloat(ask).toFixed(2)}</td>
                <td>Real</td>
                <td>{(ask * parseInt(value, 10)).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
};
