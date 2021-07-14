import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense } from '../actions';

class Table extends React.Component {
  // Esse botão acessa dispara uma action que delata o item do id conrrespondente
  // handleButton(id) {
  //   remove
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
    const { remove, edit } = this.props;
    return (
      <tr key={ id }>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{value}</td>
        <td>{name}</td>
        <td>{Number(exchangeRate.ask).toFixed(2)}</td>
        <td>{total.toFixed(2)}</td>
        <td>Real</td>
        <td>
          <button
            data-testid="edit-btn"
            type="button"
            onClick={ () => edit(id) }
          >
            Editar
          </button>
          <button
            data-testid="delete-btn"
            type="button"
            onClick={ () => remove(id) }
          >
            Excluir
          </button>
        </td>
      </tr>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        {this.thead()}
        <tbody>
          {expenses.map((expense) => this.tbody(expense))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  remove: (id) => dispatch(removeExpense(id)),
  edit: (id) => dispatch(removeExpense(id)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  remove: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
