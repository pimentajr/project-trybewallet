import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const headers = [
  'Descrição',
  'Tag',
  'Método de pagamento',
  'Valor',
  'Moeda',
  'Câmbio utilizado',
  'Valor convertido',
  'Moeda de conversão',
  'Editar/Excluir'];

class ExpensesTable extends Component {
  convertCurrencyValueToBRL(expense) {
    return (Number(expense.value) * expense.exchangeRates[expense.currency]
      .ask).toFixed(2);
  }

  actualCurrency(expense) {
    return expense.exchangeRates[expense.currency].name.split('/')[0];
  }

  actualCotation(expense) {
    return (Number(expense.exchangeRates[expense.currency]
      .ask).toFixed(2));
  }

  deleteExpense() {
    console.log(1);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            {headers.map((head) => <th key={ head }>{head}</th>)}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{expense.value}</td>
              <td>{this.actualCurrency(expense)}</td>
              <td>{this.actualCotation(expense)}</td>
              <td>{this.convertCurrencyValueToBRL(expense)}</td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ (e) => this.deleteExpense(e) }
                >
                  <img src="" alt="Botão deletar" />
                </button>
                <button
                  type="button"
                  data-testid="edit-btn"
                >
                  <img src="" alt="Botão editar" />
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
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(ExpensesTable);
