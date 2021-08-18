import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeItem } from '../actions';

class TableValues extends Component {
  constructor() {
    super();
    this.deleteItem = this.deleteItem.bind(this);
  }

  deleteItem({ target }) {
    const { items, deleteItemProps } = this.props;
    const newItems = items.filter(
      (value) => parseFloat(value.id) !== parseFloat(target.value),
    );
    console.log(newItems);
    deleteItemProps(newItems);
  }

  render() {
    const { items } = this.props;
    return (
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
        {items.map((value) => {
          const { currency, exchangeRates } = value;
          const cambio = exchangeRates[currency].ask;
          const conversao = (parseFloat(value.value) * exchangeRates[currency].ask);
          return (
            <tr key={ value.id }>
              <td>{ value.description }</td>
              <td>{ value.tag }</td>
              <td>{ value.method }</td>
              <td>{ value.value }</td>
              <td>{ exchangeRates[currency].name }</td>
              <td>{ Math.round(cambio * 100) / 100 }</td>
              <td>{ Math.round(conversao * 100) / 100 }</td>
              <td>Real</td>
              <td>
                <button type="button">Editar</button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  value={ value.id }
                  onClick={ this.deleteItem }
                >
                  Excluir
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    );
  }
}

TableValues.propTypes = {
  items: PropTypes.arrayOf,
  deleteItemProps: PropTypes.func,
};

TableValues.defaultProps = {
  items: {},
  deleteItemProps: undefined,
};

const mapStateToProps = (state) => ({
  items: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteItemProps: (state) => dispatch(removeItem(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableValues);
