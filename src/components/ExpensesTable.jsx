import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { walletRemoveExpense } from '../actions';

class ExpensesTable extends Component {
  constructor() {
    super();

    this.removeTableRow = this.removeTableRow.bind(this);
  }

  removeTableRow(id) {
    const { removeRow } = this.props;
    removeRow(id);
  }

  render() {
    const { wallet } = this.props;
    const { expenses } = wallet;
    const tableBody = expenses.map((expense) => {
      const { id, value, description, currency, method, tag, exchangeRates } = expense;
      const currentCurrency = exchangeRates[currency];
      return (
        <tbody key={ id }>
          <tr>
            <td>{ description }</td>
            <td>{ tag }</td>
            <td>{ method }</td>
            <td>{ value }</td>
            <td>{ currentCurrency.name }</td>
            <td>{ parseFloat(currentCurrency.ask).toFixed(2) }</td>
            <td>{ (currentCurrency.ask * value).toFixed(2) }</td>
            <td>Real</td>
            <td>
              <button
                data-testid="delete-btn"
                type="button"
                onClick={ () => this.removeTableRow(id) }
              >
                Remover
              </button>
            </td>
          </tr>
        </tbody>
      );
    });

    return (
      <table className="wallet__table">
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
        { tableBody }
      </table>
    );
  }
}

ExpensesTable.propTypes = {
  wallet: PropTypes.objectOf(PropTypes.any).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  removeRow: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  removeRow: (id) => dispatch(walletRemoveExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
