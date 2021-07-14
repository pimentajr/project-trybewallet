import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  constructor(props) {
    super(props);
    this.table = this.table.bind(this);
  }

  table() {
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
        <tbody>
          {this.tableBody()}
        </tbody>
      </table>
    );
  }

  tableBody() {
    const { expenses } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = expenses;
    return (
      <tr>
        <th>{description}</th>
        <th>{ tag }</th>
        <th>{method}</th>
        <th>{ value }</th>
        <th>{currency}</th>
        <td>2</td>
        <td>{Math.round(2 * 100) / 100}</td>
        <td>Real</td>
        <td>
          <button type="button">Editar</button>
          <button
            type="button"
            data-testid="delete-btn"
            // onClick={ () => deleteOneExpense() }
          >
            Excluir
          </button>
        </td>
      </tr>
    );
  }

  render() {
    return (
      <>
        { this.table() }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.array,
  value: PropTypes.number,
  description: PropTypes.string,
  currency: PropTypes.string,
  method: PropTypes.string,
  tag: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Table);
