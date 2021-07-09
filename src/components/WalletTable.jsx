import React from 'react';
import { connect } from 'react-redux';
import { fetchCoinsAPI, addExpense } from '../actions';

class WalletTable extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      description:'',
      currency:'USD',
      method:'dinheiro',
      tag:'alimentacao',
    }

    this.convertedValue = this.convertedValue.bind(this);
  }

  convertedValue(value, ask) {
    const result = (value * ask).toFixed(2)
    return result;
  }

  render() {
    const { expenses = [] } = this.props;

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
          expenses.map(({
            description,
            tag,
            method,
            value,
            currency,
            exchangeRates,
          },index) => (
            <tr key={index}>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{value}</td>
              <td>{exchangeRates[currency].name}</td>
              <td>{parseFloat(exchangeRates[currency].ask).toFixed(2)}</td>
              <td>{this.convertedValue(value, exchangeRates[currency].ask)}</td>
              <td>Real</td>
              <td>Editar/Excluir</td>
            </tr>
          ))
        }
        </tbody>
        
        {/* <button type="button" onClick={ () => setExpense(this.state, this.props.fetchAPI)}>Adicionar despesa</button> */}
      </table>
    );
  }
}

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});


export default connect(mapStateToProps)(WalletTable);
