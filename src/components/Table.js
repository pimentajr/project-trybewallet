import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    deleteExpense as deleteExpenseAction,
  } from '../actions';

class Table extends Component {
  constructor() {
    super();

    this.renderTBody = this.renderTBody.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
    this.getExchangeRateData = this.getExchangeRateData.bind(this);
  }

  getExchangeRateData({ currency, exchangeRates }, property) {
    return exchangeRates[currency][property];
  }

  renderButtons(expense) {
    const { deleteExpense } = this.props;

    return (
      <button
        type="button"
        data-testid="delete-btn"
        onClick={ () => deleteExpense(expense.id) }
      >
        Excluir
      </button>
    );
  }

  renderTBody() {
    const { expenses } = this.props;

    return (
      <tbody>
        {expenses.length === 0 ? <span>Login</span>
          : expenses.map((expense) => {
            const { id, value, description, method, tag } = expense;
            return (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>
                  { Math.round(value * 100) / 100 }
                </td>
                <td>
                  { this.getExchangeRateData(expense, 'name') }
                </td>
                <td>
                  { (Math.round(
                    this.getExchangeRateData(expense, 'ask') * 100,
                  ) / 100).toFixed(2) }
                </td>
                <td>
                  { (Math.round(
                    value * this.getExchangeRateData(expense, 'ask') * 100,
                  ) / 100).toFixed(2) }
                </td>
                <td>Real</td>
                <td>
                  { this.renderButtons(expense) }
                </td>
              </tr>
            );
          })}
      </tbody>
    );
  }

  render() {
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
        {this.renderTBody()}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(deleteExpenseAction(id)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
