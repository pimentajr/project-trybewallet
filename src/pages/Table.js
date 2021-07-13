import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;

    return (
      <table>
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

        { expenses.map((ex, index) => (
          <tr key={ index }>
            <td>{ex.description}</td>
            <td>{ ex.tag }</td>
            <td>{ ex.method }</td>
            <td>{ ex.value }</td>
            <td>{ ex.exchangeRates[ex.currency].name }</td>
            <td>{ Number(ex.exchangeRates[ex.currency].ask).toFixed(2) }</td>
            <td>{ Number(ex.value * ex.exchangeRates[ex.currency].ask).toFixed(2) }</td>
            <td>Real</td>
            <td>
              <button type="button">Editar</button>
              <button type="button">Excluir</button>
            </td>
          </tr>)) }
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.shape(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
