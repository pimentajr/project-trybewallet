import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense, openExpense } from '../actions';

class ExpensesTable extends Component {
  renderThead() {
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

  renderTbody() {
    const { expenses, removeExpenseAction, openExpenseAction, handleForm } = this.props;
    return (
      <tbody>
        { expenses.map((exp) => (
          <tr key={ exp.id }>
            <td>{ exp.description }</td>
            <td>{ exp.tag }</td>
            <td>{ exp.method }</td>
            <td>{ Math.round(exp.value * 100) / 100 }</td>
            <td>{ exp.exchangeRates[exp.currency].name.split('/')[0] }</td>
            <td>{ parseFloat(exp.exchangeRates[exp.currency].ask).toFixed(2) }</td>
            <td>
              { parseFloat(exp.value * exp.exchangeRates[exp.currency].ask).toFixed(2) }
            </td>
            <td>Real</td>
            <td>
              <button
                type="button"
                data-testid="edit-btn"
                onClick={ () => { openExpenseAction(exp); handleForm(exp); } }
              >
                O
              </button>
              <button
                type="button"
                data-testid="delete-btn"
                onClick={ () => removeExpenseAction(exp) }
              >
                X
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }

  render() {
    return (
      <table>
        { this.renderThead() }
        { this.renderTbody() }
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpenseAction: (payload) => dispatch(removeExpense(payload)),
  openExpenseAction: (payload) => dispatch(openExpense(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);

ExpensesTable.propTypes = ({
  expenses: PropTypes.arrayOf({ Object }),
  removeExpenseAction: PropTypes.func,
  openExpense: PropTypes.func,
}).isRequired;
