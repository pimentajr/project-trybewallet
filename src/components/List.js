import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';

const tableCamps = ['Descrição',
  'Tag',
  'Método de pagamento',
  'Valor',
  'Moeda',
  'Câmbio utilizado',
  'Valor convertido',
  'Moeda de conversão',
  'Editar/Excluir'];

class List extends React.Component {
  constructor() {
    super();
    this.deleteButton = this.deleteButton.bind(this);
    this.editButton = this.editButton.bind(this);
  }

  editButton(id) {
    console.log(id);
  }

  deleteButton(id) {
    const { expenses, expensesFunc } = this.props;
    const newExpenses = expenses.reduce((acc, cur) => {
      if (cur.id !== id) {
        return [...acc, cur];
      }
      return acc;
    }, []);
    expensesFunc(newExpenses);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <tr>
          {tableCamps.map((element, index) => (
            <th key={ index }>{ element }</th>
          ))}
        </tr>
        {expenses.map((element, index) => {
          const { exchangeRates, currency, description, tag, method, value } = element;
          const name = exchangeRates[currency].name.split('/');
          const exchange = exchangeRates[currency].ask;
          return (
            <tr key={ index }>
              <td>{ description }</td>
              <td>{ tag }</td>
              <td>{ method }</td>
              <td>{ value }</td>
              <td>{ name[0] }</td>
              <td>{ parseFloat(exchange).toFixed(2) }</td>
              <td>{ parseFloat(value * exchange).toFixed(2) }</td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => this.editButton(element.id) }
                >
                  edit
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => this.deleteButton(element.id) }
                >
                  delete
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  expensesFunc: (expenses) => dispatch(deleteExpense(expenses)),
});

List.propTypes = {
  expenses: PropTypes.isRequired,
  expensesFunc: PropTypes.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
