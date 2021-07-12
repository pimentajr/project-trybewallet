import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { sendExp } = this.props;
    return (
      <div>
        <table className="table">
          <thead className="table-header">
            <tr className="menu">
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de Pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio Utilizado</th>
              <th>Valor Convertido</th>
              <th>Moeda de Conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { sendExp.map((product) => (
              <tr key={ product.id }>
                <td>{ product.descricao }</td>
                <td>{ product.tag }</td>
                <td>{ product.pay }</td>
                <td>{ product.value }</td>
                <td>{ product.exchangeRates[product.moeda].name }</td>
                <td>{ Number(product.exchangeRates[product.moeda].ask).toFixed(2) }</td>
                <td>
                  { Number(product.exchangeRates[product.moeda].ask * product.value)
                    .toFixed(2) }
                </td>
                <td>Real</td>
                <td>button</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sendExp: state.wallet.expenses,
});

Table.propTypes = ({
  sendExp: PropTypes.arrayOf(PropTypes.object),
}).isRequired;

export default connect(mapStateToProps, null)(Table);
