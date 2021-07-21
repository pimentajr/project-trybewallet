import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';
import { deleteExpense, enableEditExpense } from '../actions';
import './expensesTable.css';

class ExpensesTable extends React.Component {
  delete(id) {
    const { dispatchDeleteExpense } = this.props;
    return (
      <FaRegTrashAlt
        type="button"
        data-testid="delete-btn"
        onClick={ () => dispatchDeleteExpense(id) }
      />
    );
  }

  edit(id) {
    const { dispatchEnableEdit } = this.props;
    return (
      <FaEdit
        type="button"
        data-testid="edit-btn"
        onClick={ () => dispatchEnableEdit(id) }
      />
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <section>
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
          <tbody>
            { expenses.length > 0 ? (
              expenses.map((expense) => (
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
                    { (parseFloat(expense.exchangeRates[expense.currency].ask)
                      * parseFloat(expense.value)).toFixed(2) }
                  </td>
                  <td>Real</td>
                  <td>
                    { this.edit(expense.id) }
                    { this.delete(expense.id) }
                  </td>
                </tr>
              ))
            ) : null }
          </tbody>
        </table>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchDeleteExpense: (id) => dispatch(deleteExpense(id)),
  dispatchEnableEdit: (id) => dispatch(enableEditExpense(id)),
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchDeleteExpense: PropTypes.func.isRequired,
  dispatchEnableEdit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
