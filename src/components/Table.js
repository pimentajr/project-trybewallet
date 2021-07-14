import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends React.Component {
  renderTable(expense) {
    const sigle = expense.currency;
    const coinName = expense.exchangeRates[`${sigle}`].name;
    const cambio = coinName.split('/')[0];
    const conversionValue = expense.exchangeRates[`${sigle}`].ask;
    const convertedValue = expense.value * expense.exchangeRates[`${sigle}`].ask;
    return (
      <tr>
        <td>{expense.description}</td>
        <td>{expense.tag}</td>
        <td>{expense.method}</td>
        <td>{expense.value}</td>
        <td>{cambio}</td>
        <td>{parseFloat(conversionValue).toFixed(2)}</td>
        <td>{parseFloat(convertedValue).toFixed(2)}</td>
        <td>Real</td>
      </tr>
    );
  }

  render() {
    const { expenses } = this.props;
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
          { expenses.map(this.renderTable) }
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
  })).isRequired,
};
