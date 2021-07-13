import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { delExpenseAction, changeFormMenu } from '../actions';

class Count extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  // clear button
  handleClick(id) {
    const { deleteExpense } = this.props;
    deleteExpense(id);
  }

  // render wallet expenses
  render() {
    const { expenses, changeMenu } = this.props;

    return expenses.map((expense, index) => (
      <tr key={ index }>
        <td>{expense.description}</td>
        <td>{expense.tag}</td>
        <td>{expense.method}</td>
        <td>{expense.value}</td>
        <td>{expense.exchangeRates[expense.currency].name.split('/')[0]}</td>
        <td>{parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
        <td>
          {(expense.value * expense.exchangeRates[expense.currency].ask).toFixed(2)}
        </td>
        <td>Real</td>
        <td>
          <button
            type="button"
            data-testid="edit-btn"
            onClick={ () => changeMenu(true, expense.id) }
          >
            Editar
          </button>
          |
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => this.handleDeleteClick(expense.id) }
          >
            Excluir
          </button>
        </td>
      </tr>
    ));
  }
}

// get wallet expenses
function mapStateToProps(state) {
  return { expenses: state.wallet.expenses };
}

// dispatch
const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(delExpenseAction(id)),
  changeMenu: (bool, expenseID) => dispatch(changeFormMenu(bool, expenseID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Count);

// props validation
Count.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any),
  deleteExpense: PropTypes.func.isRequired,
  changeMenu: PropTypes.func.isRequired,
};

Count.defaultProps = { expenses: [] };
