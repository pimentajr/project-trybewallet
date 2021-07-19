import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends React.Component {
  render() {
    const { expensesFromState } = this.props;
    // Lógica de inserção das informações no header desenvolvida
    // com a ajuda do Lucas Martins - Turma 10 - Tribo B.
    return (
      <div>
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
            { expensesFromState.map((expensesItens) => (
              <tr key={ expensesItens.id }>
                <td>{ expensesItens.description }</td>
                <td>{ expensesItens.tag }</td>
                <td>{ expensesItens.method }</td>
                <td>{ expensesItens.value }</td>
                <td>{ expensesItens.exchangeRates[expensesItens.currency].name }</td>
                <td>
                  {
                    Number(parseFloat(expensesItens
                      .exchangeRates[expensesItens.currency]
                      .ask).toFixed(2))
                  }
                </td>
                <td>
                  {
                    (Number(expensesItens
                      .exchangeRates[expensesItens.currency].ask)
                      * Number(expensesItens.value)).toFixed(2)
                  }
                </td>
                <td>Real</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expensesFromState: state.wallet.expenses,
});

Table.propTypes = {
  expensesFromState: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Table);
