import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
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
            {expenses.map(({
              id,
              value,
              description,
              currency,
              payment,
              tag,
              exchangesRates,
            }) => (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ payment }</td>
                <td>{ value }</td>
                <td>{ currency }</td>
                <td>{ Number(exchangesRates).toFixed(2) }</td>
                <td>{(Number(exchangesRates) * Number(value)).toFixed(2)}</td>
                <td>Real</td>
                {/*                 <td>
                  <button type="button" data-testid="edit-btn">Editar despesa</button>
                  <button type="button">Excluir</button>
                </td> */}
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

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.string),
/*   value: PropTypes.number,
  description: PropTypes.string,
  currency: PropTypes.number,
  payment: PropTypes.string,
  tag: PropTypes.string, */
}.isRequired;

export default connect(mapStateToProps, null)(Table);
/* export default Table; */
