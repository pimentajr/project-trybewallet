import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Table extends Component {
  constructor() {
    super();
    this.renderButtonDelete = this.renderButtonDelete.bind(this);
    this.renderButtonEdit = this.renderButtonEdit.bind(this);
  }

  renderButtonDelete() {
    return (
      <button type="button" data-testid="delete-btn">Excluir</button>
    );
  }

  renderButtonEdit() {
    return (
      <button type="button" data-testid="edit-btn">Editar</button>
    );
  }

  render() {
    const { expensesReducer } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de Pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de Conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expensesReducer.map((value, index) => (
              <tr key={ index }>
                <td>{value.description}</td>
                <td>{value.tag}</td>
                <td>{value.method}</td>
                <td>{value.value}</td>
                <td>{value.exchangeRates[value.currency].name}</td>
                <td>{(Number(value.exchangeRates[value.currency].ask).toFixed(2))}</td>
                <td>
                  {(Number(value.exchangeRates[value.currency].ask * value.value)
                    .toFixed(2))}
                </td>
                <td>Real</td>
                <td>
                  {this.renderButtonDelete(value)}
                  {this.renderButtonEdit(value.id)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    );
  }
}

Table.propTypes = ({
  expensesReducer: PropTypes.func,
}).isRequired;

export default Table;
