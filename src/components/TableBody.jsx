import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteExpenses } from '../actions';

class TableBody extends Component {
  constructor() {
    super();
    this.handleDeleteTableElement = this.handleDeleteTableElement.bind(this);
  }

  handleDeleteTableElement({ target: { id } }) {
    const { expenses, deleteExpense } = this.props;
    const filteredExpenses = expenses.filter((expense) => expense.id !== parseFloat(id));
    deleteExpense(filteredExpenses);
  }

  render() {
    const { expenses } = this.props;
    return (
      <tbody>
        {expenses && expenses.map((expense) => {
          const {
            description,
            id,
            tag,
            value,
            method,
            exchangeRates,
            currency,
          } = expense;
          return (
            <tr key={ id }>
              <td>{ description }</td>
              <td>{ tag }</td>
              <td>{ method }</td>
              <td>{ value }</td>
              <td>{ exchangeRates[currency].name.split('/')[0] }</td>
              <td>{ Number(exchangeRates[currency].ask).toFixed(2) }</td>
              <td>{ Number(value * exchangeRates[currency].ask).toFixed(2) }</td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  id={ id }
                  onClick={ (event) => this.handleDeleteTableElement(event) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (payload) => dispatch(deleteExpenses(payload)),
});

TableBody.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableBody);
