import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { fetchCurrency, addExpense } from '../actions';

class Table extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     description: '',
  //     value: 0,
  //     currency: '',
  //     method: '',
  //     tag: '',
  //   };
  // }
  thead() {
    return (
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
    );
  }

  tbody(expense) {
    const { description, currency, method, tag, value, exchangeRates, id } = expense;
    const exchangeRate = Object.values(exchangeRates)
      .find((actualCurr) => (actualCurr.code === currency));
    const total = Number(value) * Number(exchangeRate.ask);
    const name = exchangeRate.name.split('/')[0];

    return (
      <tbody key={ id }>
        <tr>
          <td>{description}</td>
          <td>{tag}</td>
          <td>{method}</td>
          <td>{value}</td>
          <td>{name}</td>
          <td>{Number(exchangeRate.ask).toFixed(2)}</td>
          <td>{total.toFixed(2)}</td>
          <td>Real</td>
          <td>Editar/Excluir</td>
        </tr>
      </tbody>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        {this.thead()}
        {expenses.map((expense) => this.tbody(expense))}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

// const mapDispatchToProps = (dispatch) => ({

// });

// ExpensesForm.propTypes = {
//   APICurrency: PropTypes.func.isRequired,
//   add: PropTypes.func.isRequired,
//   walletExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
//   currencies: PropTypes.objectOf(PropTypes.object).isRequired,
// };

export default connect(mapStateToProps)(Table);
