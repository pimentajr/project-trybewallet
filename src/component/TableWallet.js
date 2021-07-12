import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class TableWallet extends Component {
  render() {
    const { expenseState } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <tr>Descrição</tr>
            <tr>Tag</tr>
            <tr>Método de pagamento</tr>
            <tr>Valor</tr>
            <tr>Moeda</tr>
            <tr>Câmbio utilizado</tr>
            <tr>Valor convertido</tr>
            <tr>Moeda de conversão</tr>
            <tr>Editar e excluir</tr>
          </tr>
        </thead>
        <tbody>
          {
            expenseState.map((e) => {
              const { id, currency, description, tag, method, value, exchangeRates } = e;
              return (
                <tr key={ id }>
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ value }</td>
                  <td>{(exchangeRates[currency].name).split('/')[0]}</td>
                  <td>{ (Number(exchangeRates[currency].ask)).toFixed(2) }</td>
                  <td>{ (Number(exchangeRates[currency].ask * value)).toFixed(2) }</td>
                  <td>{ exchangeRates[currency].name }</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="delete-btn"
                    >
                      Editar/Excluir
                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}
const mapStateToProps = (state) => ({
  expenseState: state.wallet.expenses,
});

export default connect(mapStateToProps)(TableWallet);
TableWallet.propTypes = {
  expenseState: PropTypes.func,
}.isRequired;
