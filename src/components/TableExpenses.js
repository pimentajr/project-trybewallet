import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';

class TableExpenses extends Component {
  renderHead() {
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

  renderBody() {
    const { expenses, dispatchDeleteExpense } = this.props;

    return (
      <tbody>
        {expenses.map(({
          id, value,
          description,
          currency,
          method, tag,
          exchangeRates,
        }) => (
          <tr key={ id }>
            <td>{description}</td>
            <td>{tag}</td>
            <td>{method}</td>
            <td>{value}</td>
            <td>{currency}</td>
            <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
            <td>
              {
                (Number(exchangeRates[currency].ask) * Number(value))
                  .toFixed(2)
              }
            </td>
            <td>Real</td>
            <td>{exchangeRates[currency].name}</td>
            <td>
              <button type="button">Editar</button>
              <button
                type="button"
                data-testid="delete-btn"
                onClick={ () => dispatchDeleteExpense(id) }
              >
                Deletar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }

  render() {
    return (
      <table>
        { this.renderHead() }
        { this.renderBody() }
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchDeleteExpense: (id) => dispatch(deleteExpense(id)),
});

TableExpenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchDeleteExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableExpenses);
