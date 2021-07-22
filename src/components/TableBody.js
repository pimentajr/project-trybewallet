import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class TableBody extends Component {
  render() {
    const { expenses } = this.props;
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
          </tr>
        )) }
      </tbody>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

TableBody.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(TableBody);
