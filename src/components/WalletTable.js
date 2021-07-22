import React, { Component } from 'react';
import { connect } from 'react-redux';

class WalletTable extends Component {
  render() {
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
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expense: state.wallet.expense,
});

/* const mapDipatchToProps = (dispatch) => {
  xablau: (dispatch) => {};
}; */

export default connect(mapStateToProps, null)(WalletTable);
