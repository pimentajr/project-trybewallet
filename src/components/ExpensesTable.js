import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TableHeader from './TableHeader';

class ExpensesTable extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <TableHeader />
        { expenses.map((expense, index) => (
          <tr key={ index }>
            <td>
              { expense.description }
            </td>
            <td>
              { expense.tag }
            </td>
            <td>
              { expense.method }
            </td>
            <td>
              { expense.value }
            </td>
            <td>
              { (Object.values(expense.exchangeRates).find((cotacao) => (
                cotacao.code === expense.currency
              )).name).split('/')[0]}
            </td>
            <td>
              { parseFloat(Object.values(expense.exchangeRates).find((cotacao) => (
                cotacao.code === expense.currency
              )).ask).toFixed(2)}
            </td>
            <td>
              { Object.values(expense.exchangeRates).find((cotacao) => (
                cotacao.code === expense.currency
              )).ask * expense.value}
            </td>
            <td> Real </td>
          </tr>
        ))}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(ExpensesTable);

ExpensesTable.propTypes = {
  expenses: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};
