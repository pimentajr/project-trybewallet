import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../actions';

class WalletTable extends React.Component {
  constructor() {
    super();

    this.convertedValue = this.convertedValue.bind(this);
    this.totalValue = this.totalValue.bind(this);
    this.buttonFodase = this.buttonFodase.bind(this);
  }

  convertedValue(value, ask) {
    const result = (value * ask).toFixed(2);

    return result;
  }

  totalValue() {
    const { expenses } = this.props;
    let result = 0;

    expenses.forEach(({ exchangeRates, currency, value }) => {
      result += exchangeRates[currency].ask * value;
    });

    return result;
  }

  buttonFodase(id, totValue, delExpense) {
    return (
      <button
        data-testid="delete-btn"
        type="button"
        onClick={ () => delExpense({ id, totValue }) }
      >
        Excluir
      </button>
    );
  }

  render() {
    const { expenses = [], delExpense } = this.props;
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
              id,
              description,
              tag,
              method,
              value,
              currency,
              exchangeRates,
            }) => {
              const convValue = this.convertedValue(value, exchangeRates[currency].ask);
              const totValue = parseFloat(this.totalValue().toFixed(2));
              return (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{value}</td>
                  <td>{exchangeRates[currency].name}</td>
                  <td>{parseFloat(exchangeRates[currency].ask).toFixed(2)}</td>
                  <td>{convValue}</td>
                  <td>Real</td>
                  <td>
                    {this.buttonFodase(id, totValue, delExpense)}
                  </td>
                </tr>);
            })
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

const mapDispatchToProps = (dispatch) => ({
  delExpense: (data) => dispatch(deleteExpense(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletTable);

WalletTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  delExpense: PropTypes.func.isRequired,
};
