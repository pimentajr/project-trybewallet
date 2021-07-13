import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as currencyActions from '../actions';

class TableWallet extends Component {
  delExpense(id) {
    const { expenseRemove } = this.props;
    expenseRemove(id);
  }

  render() {
    const { expenseState } = this.props;
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
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.delExpense(id) }
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

const mapDispatchToProps = (dispatch) => ({
  expenseRemove: (id) => dispatch(currencyActions.removeExpensesAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableWallet);
TableWallet.propTypes = {
  expenseState: PropTypes.func,
}.isRequired;
