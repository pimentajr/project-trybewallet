import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense } from '../actions/walletActions';

class TableBody extends Component {
  render() {
    const { expenses, remove } = this.props;
    return (
      <tbody>
        { expenses.map((expense) => (
          <tr key={ expense.id }>
            <td>{ expense.description }</td>
            <td>{ expense.tag }</td>
            <td>{ expense.method }</td>
            <td>{ expense.value }</td>
            <td>{ expense.exchangeRates[expense.currency].name.split('/')[0] }</td>
            <td>
              { parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2) }
            </td>
            <td>
              { parseFloat(
                expense.value * expense.exchangeRates[expense.currency].ask,
              ).toFixed(2) }
            </td>
            <td>Real</td>
            <td>
              <button
                type="button"
                data-testid="delete-btn"
                onClick={ () => remove(expense) }
              >
                Remover
              </button>
            </td>
          </tr>
        )) }
      </tbody>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  remove: (expense) => dispatch(removeExpense(expense)),
});

TableBody.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(TableBody);
