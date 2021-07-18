import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function round(value) {
  return Math.round(value * 100) / 100;
}

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(id) {
    const { deleteExpense } = this.props;
    deleteExpense(id);
  }

  renderExpense(expense) {
    const exchangeRate = expense.exchangeRates[expense.currency];
    const [currencyName] = exchangeRate.name.split('/');

    return (
      <tr key={ expense.id }>
        <td>{expense.description}</td>
        <td>{expense.tag}</td>
        <td>{expense.method}</td>
        <td>{expense.value}</td>
        <td>{currencyName}</td>
        <td>{round(exchangeRate.ask)}</td>
        <td>{round(exchangeRate.ask * expense.value)}</td>
        <td>Real</td>
        <td>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => this.onDelete(expense.id) }
          >
            remover
          </button>
        </td>
      </tr>
    );
  }

  render() {
    const { expenses } = this.props;

    return (
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
        <tbody>{expenses.map((item) => this.renderExpense(item))}</tbody>
      </table>
    );
  }
}

function mapDipatchToProps(dispatch) {
  return {
    deleteExpense: (id) => {
      dispatch({ type: 'WALLET_DELETE_EXPENSE', payload: id });
    },
  };
}

function mapStateToProps(state) {
  return {
    expenses: state.wallet.expenses,
  };
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDipatchToProps)(Table);
