import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteItem } from '../actions';

class Table extends Component {
  constructor(props) {
    super(props);
    this.hClick = this.hClick.bind(this);
  }

  fa(total) {
    const number = (parseFloat(total.value) * total.exchangeRates[total.currency].ask);
    return Math.round(number * 100) / 100;
  }

  hClick({ target: { value } }) {
    // console.log();
    const { expenses, delItem } = this.props;
    const newExpenses = expenses.filter((item) => item.id !== Number(value));
    delItem(newExpenses);
  }

  render() {
    const { expenses } = this.props;
    console.log('prop expenses:', expenses);
    return (
      <div>
        <table>
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
          {expenses
          && expenses.map((item, index) => (
            <tr key={ index }>
              <td>{item.description}</td>
              <td>{item.tag}</td>
              <td>{item.method}</td>
              <td>{item.value}</td>
              <td>{item.exchangeRates[item.currency].name}</td>
              <td>{Math.round((item.exchangeRates[item.currency].ask) * 100) / 100}</td>
              <td>
                { this.fa(item) }
              </td>
              <td>Real</td>
              <td>
                <button type="button">Editar</button>
                <button
                  value={ item.id }
                  type="button"
                  data-testid="delete-btn"
                  onClick={ (e) => this.hClick(e) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf.isRequired,
  delItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  delItem: (state) => dispatch(deleteItem(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
