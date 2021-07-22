import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TableHeader from './TableHeader';
import { expenseToDeleteAction } from '../actions';

class ExpensesTable extends Component {
  constructor(props) {
    super(props);
    this.expenseToDelete = this.expenseToDelete.bind(this);
  }

  expenseToDelete(id) {
    const { deleteExpense } = this.props;
    deleteExpense(id);
  }

  render() {
    const { arrayOfExpenses } = this.props;
    return (
      <table>
        <TableHeader />
        <tbody>
          {
            arrayOfExpenses.length > 0
              ? arrayOfExpenses.map((singleExpense, index) => {
                if (singleExpense.exchangeRates.USD !== undefined) {
                  const rate = singleExpense.exchangeRates[singleExpense.currency];
                  const nameCurrency = rate.name.split('/')[0];
                  const { value } = singleExpense;
                  return (
                    <tr key={ index }>
                      <td>{ singleExpense.description }</td>
                      <td>{ singleExpense.tag }</td>
                      <td>{ singleExpense.method }</td>
                      <td>{ value }</td>
                      <td>{ nameCurrency }</td>
                      <td>{ parseFloat(rate.ask).toFixed(2) }</td>
                      <td>{ (rate.ask * value).toFixed(2) }</td>
                      <td>Real</td>
                      <td>
                        <button
                          type="button"
                        >
                          Alterar
                        </button>
                        <button
                          type="button"
                          data-testid="delete-btn"
                          onClick={ () => this.expenseToDelete(singleExpense.id) }
                        >
                          Deletar
                        </button>

                      </td>
                    </tr>
                  );
                }
                return (<tr key="a"><td>Sem Despesas</td></tr>);
              })
              : <tr><td>Sem Despesas</td></tr>
          }
        </tbody>
      </table>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(expenseToDeleteAction(id)),
});

const mapStateToProps = (state) => ({
  arrayOfExpenses: state.wallet.expenses,
});

ExpensesTable.propTypes = {
  arrayOfExpenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
