import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenses } from '../actions';

class Table extends Component {
/*   constructor() {
    super();
    this.dispatchDelete = this.dispatchDelete.bind(this);
  } */
  /*   deleteExp(id) {
    const { deletes } = this.props;
    dispatchDelete(id);
  } */
  deleteExp(id) {
    const { dispatchDelete } = this.props;
    return (
      <button
        type="button"
        data-testid="delete-btn"
        onClick={ () => dispatchDelete(id) }
      >
        Excluir
      </button>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <div>
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
          <tbody>
            { expenses.length > 0 && expenses.map(({
              id,
              value,
              description,
              currency,
              method,
              tag,
              exchangeRates,
            }) => (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ value }</td>
                <td>{ exchangeRates[currency].name }</td>
                <td>{ Number(exchangeRates[currency].ask).toFixed(2) }</td>
                <td>{ Number(exchangeRates[currency].ask * value).toFixed(2) }</td>
                <td>Real</td>
                <td>
                  <button type="button" data-testid="edit-btn">Editar despesa</button>
                  { this.deleteExp(id) }
                  {/* <button type="button" data-testid="delete-btn" onClick={ () => this.dispatchDelete(id) }>
                  Excluir</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchDelete: (id) => dispatch(deleteExpenses(id)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.number,
  description: PropTypes.string,
  currency: PropTypes.number,
  payment: PropTypes.string,
  tag: PropTypes.string,
  dispatchDelete: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
