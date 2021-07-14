import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { expenseEditAction, expenseRemoveAction } from '../actions';
import Theader from '../table-components/Theader';

class Table extends Component {
  render() {
    const { expenses, removeExpense, expenseEdit } = this.props;
    return (
      <div>
        <table>
          <Theader />
          { expenses && expenses.map((exp, index) => {
            const { description, tag, method, value, exchangeRates, currency } = exp;
            const valueFloat = Number.parseFloat(value);
            const currencyName = (exchangeRates[currency].name)
              .replace('/Real Brasileiro', '');
            const ask = (Number.parseFloat(exchangeRates[currency].ask));
            return (
              <tbody key={ index }>
                <tr>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>
                    {valueFloat}
                  </td>
                  <td>{currencyName}</td>
                  <td>{ask.toFixed(2)}</td>
                  <td>{(ask * valueFloat).toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => expenseEdit(exp) }
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => removeExpense(exp) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              </tbody>);
          }) }
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (state) => dispatch(expenseRemoveAction(state)),
  expenseEdit: (state) => dispatch(expenseEditAction(state)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  removeExpense: PropTypes.func.isRequired,
  expenseEdit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
