import PropTypes from 'prop-types';
import { connect } from 'react-redux';//
import React, { Component } from 'react';
import * as actions from '../actions';

class Table extends Component {
  handleCurrecyTrueName({ currency, exchangeRates }) {
    return Object.values(exchangeRates).find((coin) => coin.code === currency).name;
  }

  handleCambioUtilizado({ currency, exchangeRates }) {
    const valor = Object.values(exchangeRates).find((coin) => coin.code === currency).ask;
    return Number(valor).toFixed(2);
  }

  handleConvertCambio({ value, currency, exchangeRates }) {
    const valor = Object.values(exchangeRates).find((coin) => coin.code === currency).ask;
    return (Number(valor) * value).toFixed(2);
  }

  render() {
    const { expenses, removeExpense } = this.props;
    console.log(expenses);
    return (
      <table>
        <tr className="tr_table">
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
        {expenses.map((info) => (
          <tr key={ info.id } className="tr_table">
            <td>{info.description}</td>
            <td>{info.tag}</td>
            <td key={ info.id }>{info.method}</td>
            <td key={ info.id }>{info.value}</td>
            <td key={ info.id }>{ this.handleCurrecyTrueName(info) }</td>
            <td key={ info.id }>{ this.handleCambioUtilizado(info) }</td>
            <td key={ info.id }>{ this.handleConvertCambio(info) }</td>
            <td key={ info.id }>Real</td>
            <button
              data-testid="delete-btn"
              type="button"
              onClick={ () => removeExpense(info.id) }
            >
              Deletar
            </button>
          </tr>
        ))}
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.func.isRequired,
  removeExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (expense) => dispatch(actions.removeExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
