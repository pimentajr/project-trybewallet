import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const tableCamps = ['Descrição',
  'Tag',
  'Método de pagamento',
  'Valor',
  'Moeda',
  'Câmbio utilizado',
  'Valor convertido',
  'Moeda de conversão',
  'Editar/Excluir'];

class ExpenseList extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <tr>
          {tableCamps.map((element, index) => (
            <th key={ index }>{ element }</th>
          ))}
        </tr>
        {expenses.map((element, index) => {
          const { exchangeRates, currency, description, tag, method, value } = element;
          const name = exchangeRates[currency].name.split('/');
          const exchange = exchangeRates[currency].ask;
          return (
            <tr key={ index }>
              <td>{ description }</td>
              <td>{ tag }</td>
              <td>{ method }</td>
              <td>{ value }</td>
              <td>{ name[0] }</td>
              <td>{ parseFloat(exchange).toFixed(2) }</td>
              <td>{ value * exchange }</td>
              <td>Real</td>
            </tr>
          );
        })}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

ExpenseList.propTypes = {
  expenses: PropTypes.isRequired,
};

export default connect(mapStateToProps)(ExpenseList);
