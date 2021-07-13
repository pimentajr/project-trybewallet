import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import '../../Table.css';

class Table extends Component {
  convertCambio({ value, currency, exchangeRates }) {
    const valor = Object.values(exchangeRates).find((coin) => coin.code === currency).ask;
    return (Number(valor) * value).toFixed(2);
  }

  completedName({ currency, exchangeRates }) {
    return Object.values(exchangeRates).find((coin) => coin.code === currency).name;
  }

  rateCambio({ currency, exchangeRates }) {
    const valor = Object.values(exchangeRates).find((coin) => coin.code === currency).ask;
    return Number(valor).toFixed(2);
  }

  render() {
    const { expenses, delExpenses } = this.props;
    return (
      <table>
        <tr className="row">
          <th>ID</th>
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
        {expenses.map((item) => (
          <tr key={ item.id } className="">
            <td key={ item.id }>{ item.id }</td>
            <td key={ item.id }>{ item.description }</td>
            <td key={ item.id }>{ item.tag }</td>
            <td key={ item.id }>{ item.method }</td>
            <td key={ item.id }>{ item.value }</td>
            <td key={ item.id }>{ this.completedName(item) }</td>
            <td key={ item.id }>{ this.rateCambio(item) }</td>
            <td key={ item.id }>{ this.convertCambio(item) }</td>
            <td key={ item.id }>Real</td>
            <button
              data-testid="delete-btn"
              type="button"
              onClick={ () => delExpenses(item.id) }
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
  delExpenses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  delExpenses: (e) => dispatch(actions.delExpenses(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
