import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { delExpense } from '../actions/wallet';

class WalletTable extends Component {
  constructor() {
    super();
    this.deleteExpense = this.deleteExpense.bind(this);
  }

  deleteExpense(id) {
    const { deleteExp } = this.props;
    deleteExp(id);
  }

  render() {
    const { expense } = this.props;
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
            <th colSpan="2">Editar/Excluir</th>
          </tr>
        </thead>
        { expense.map((expData) => (
          <tr key={ expData.id }>
            <td>{expData.description}</td>
            <td>{expData.tag}</td>
            <td>{expData.method}</td>
            <td>{expData.value}</td>
            <td>{expData.exchangeRates[expData.currency].name.split('/')[0] }</td>
            <td>{ Number(expData.exchangeRates[expData.currency].ask).toFixed(2) }</td>
            <td>
              { (Number(expData.exchangeRates[expData.currency].ask)
                * Number(expData.value)).toFixed(2) }
            </td>
            <td>Real</td>
            <td>
              <button
                type="button"
                data-testid="delete-btn"
                onClick={ () => this.deleteExpense(expData.id) }
              >
                Excluir
              </button>
              <button type="button" data-testid="edit-btn">Editar</button>
            </td>
          </tr>
        ))}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expense: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExp: (id) => dispatch(delExpense(id)),
});

WalletTable.propTypes = {
  expense: PropTypes.Object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletTable);
