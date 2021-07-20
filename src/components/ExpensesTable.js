import React, { Component } from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';

class ExpensesTable extends Component {
  constructor() {
    super();

    this.state = {
      tableCells: {
        description: 'Descrição',
        tag: 'Tag',
        paymentMethod: 'Método de pagamento',
        value: 'Valor',
        currency: 'Moeda',
        usedExchange: 'Câmbio utilizado',
        convertedValue: 'Valor convertido',
        conversionCurrency: 'Moeda de conversão',
        editOrRemove: 'Editar/Excluir',
      },
    };
  }

  renderTableCells() {
    const { tableCells } = this.state;
    const getTableValues = Object.values(tableCells);

    const renderTableCells = getTableValues
      .map((tableCell, index) => <th className="bd-sol" key={ index }>{ tableCell }</th>);

    return renderTableCells;
  }

  render() {
    const { expenses, delExpense } = this.props;
    return (
      <table>
        <thead>
          <tr>
            { this.renderTableCells() }
          </tr>
        </thead>
        <tbody>
          { expenses.map((expense, index) => (
            <tr key={ index }>
              <td>{ expense.description }</td>
              <td>{ expense.tag }</td>
              <td>{ expense.method }</td>
              <td>{ expense.value }</td>
              <td>{ expense.exchangeRates[expense.currency].name.split('/')[0] }</td>
              <td>
                { Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }
              </td>
              <td>
                { Number(expense.value * expense.exchangeRates[expense.currency].ask)
                  .toFixed(2) }
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => delExpense(expense.id) }
                >
                  Deletar
                </button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  delExpense: (id) => dispatch(deleteExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  delExpense: PropTypes.func.isRequired,
};
