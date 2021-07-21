import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';

class ExpensesTable extends Component {
  renderTableHeader() {
    return (
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
    );
  }

  renderTableExpenses(expenses) {
    const { delExpense } = this.props;
    return (
      <tbody>
        { expenses.map((expense) => {
          const { currency, description, exchangeRates,
            id, method, tag, value } = expense;
          const usedExchange = parseFloat(exchangeRates[currency].ask);
          const convertedValue = usedExchange * parseFloat(value);
          const convertedFrom = exchangeRates[currency].name.split('/');

          return (
            <tr key={ id }>
              <td>{ description }</td>
              <td>{ tag }</td>
              <td>{ method }</td>
              <td>{ value }</td>
              <td>{ convertedFrom }</td>
              <td>{ usedExchange.toFixed(2) }</td>
              <td>{ convertedValue.toFixed(2) }</td>
              <td>Real</td>
              <td>
                <button
                  className="button is-danger is-outlined"
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => delExpense(id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          );
        }) }
      </tbody>);
  }

  render() {
    const { expenses } = this.props;

    return (
      <table>
        { this.renderTableHeader() }
        { this.renderTableExpenses(expenses) }
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  delExpense: (state) => dispatch(deleteExpense(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      currency: PropTypes.string,
      description: PropTypes.string,
      exchangeRates: PropTypes.arrayOf(
        PropTypes.shape({
          ask: PropTypes.string,
        }),
      ),
      id: PropTypes.string,
      method: PropTypes.string,
      tag: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
}.isRequired;
