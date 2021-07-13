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
            { sendExp.map((product) => (
              <tr key={ product.id }>
                <td>{ product.description }</td>
                <td>{ product.tag }</td>
                <td>{ product.method }</td>
                <td>{ product.value }</td>
                <td>{ product.exchangeRates[product.currency].name }</td>
                <td>
                  { Number(product.exchangeRates[product.currency].ask)
                    .toFixed(2) }
                </td>
                <td>
                  { Number(product.exchangeRates[product.currency].ask * product.value)
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
