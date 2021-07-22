import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ExpensesTable extends Component {
  render() {
    const { arrayOfExpenses } = this.props;
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
          {
            arrayOfExpenses.length > 0
              ? arrayOfExpenses.map((singleExpense, index) => {
                if (singleExpense.exchangeRates.USD !== undefined) {
                  const rate = singleExpense.exchangeRates[singleExpense.currency];
                  const nameCurrency = rate.name.split('/')[0];
                  const { value } = singleExpense;
                  return (
                    <tr key={ index }>
                      <td>{ singleExpense.description }</td>
                      <td>{ singleExpense.tag }</td>
                      <td>{ singleExpense.method }</td>
                      <td>{ value }</td>
                      <td>{ nameCurrency }</td>
                      <td>{ parseFloat(rate.ask).toFixed(2) }</td>
                      <td>{ (rate.ask * value).toFixed(2) }</td>
                      <td>Real</td>
                      <td>
                        <button type="button">Alterar</button>
                      </td>
                    </tr>
                  );
                }
                return (<tr key="a"><td>Sem Despesas</td></tr>);
              })
              : <tr><td>Sem Despesas</td></tr>
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  arrayOfExpenses: state.wallet.expenses,
});

ExpensesTable.propTypes = {
  arrayOfExpenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(ExpensesTable);
