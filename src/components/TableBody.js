import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class TableBody extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <tbody>
        {expenses ? expenses.map((dataRow) => (
          <tr key={ dataRow.id } className="line">
            <td>{dataRow.description}</td>
            <td>{dataRow.tag}</td>
            <td>{dataRow.method}</td>
            <td>{dataRow.value}</td>
            <td>{(dataRow.exchangeRates[dataRow.currency].name).split('/')[0]}</td>
            <td>{dataRow.exchangeRates[dataRow.currency].ask}</td>
            <td>
              {Number((dataRow.value * dataRow.exchangeRates[dataRow.currency].ask))
                .toFixed(2) }
            </td>
            <td>Real</td>
          </tr>
        )) : <span /> }
        {/* <tr className="row">
          <td className="line"> Descrição</td>
          <td className="line"> Tag</td>
          <td className="line"> Método de pagamento</td>
          <td className="line">Valor</td>
          <td className="line"> Moeda</td>
          <td className="line"> Câmbio utilizado</td>
          <td className="line"> Valor convertido</td>
          <td className="line"> Moeda de conversão</td>
          <td className="line"> Editar/Excluir</td>
        </tr> */}
      </tbody>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

TableBody.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(TableBody);
