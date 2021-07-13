import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';
import Thead from './Thead';

class ExpensesTable extends React.Component {
  render() {
    const { expenses, toDelete } = this.props;

    return (
      <table>
        <Thead />
        <tbody>
          {expenses.map((item, id) => (
            <tr key={ id }>
              <td>{ item.description }</td>
              <td>{ item.tag }</td>
              <td>{ item.method }</td>
              <td>{ item.value }</td>
              <td>{ item.exchangeRates[item.currency].name.split('/')[0] }</td>
              <td>{ parseFloat(item.exchangeRates[item.currency].ask).toFixed(2) }</td>
              <td>
                {
                  ((parseFloat(item.exchangeRates[item.currency].ask))
                      * item.value).toFixed(2)
                }
              </td>
              <td>Real</td>
              <td>
                <button type="button">
                  Editar
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => toDelete(id) }
                >
                  Excluir
                </button>
              </td>
            </tr>

          ))}
        </tbody>
      </table>
    );
  }
}

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  toDelete: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  toDelete: (id) => dispatch(deleteExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
