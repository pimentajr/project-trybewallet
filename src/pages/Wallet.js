import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApiRequest, dispatchExpense } from '../actions';
import HeaderWallet from './HeaderWallet';
import ButtonAddExpense from './ButtonAddExpense';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.AddExpense = this.AddExpense.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { FetchApi, expenses } = this.props;
    FetchApi();
    document.getElementById('description').value = expenses.description;
    document.getElementById('currency').value = expenses.currency;
    document.getElementById('method').value = expenses.method;
    document.getElementById('tag').value = expenses.tag;
    // document.getElementById('totalValue').value = parseFloat(objToChange.value);
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  AddExpense() {
    const { DispatchExp, expenses, FetchApi, currencyApi } = this.props;
    const { value, description, currency, method, tag } = this.state;
    DispatchExp([{
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: currencyApi,
    }]);
    FetchApi();
  }

  render() {
    const { currencyApi } = this.props;
    return (
      <>
        <HeaderWallet />
        <form id="form">
          <label htmlFor="value">
            Valor
            <input type="number" name="value" id="value" onChange={ this.handleChange } />
          </label>
          <label htmlFor="description">
            Descrição
            <input name="description" id="description" onChange={ this.handleChange } />
          </label>
          <label htmlFor="currency">
            Moeda
            <select id="currency" name="currency" onChange={ this.handleChange }>
              {
                Object.keys(currencyApi).map((coin, index) => (
                  coin !== 'USDT' ? <option key={ index } value={ coin }>{coin}</option>
                    : null
                ))
              }
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento
            <select id="method" name="method" onChange={ this.handleChange }>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag
            <select id="tag" name="tag" onChange={ this.handleChange }>
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <ButtonAddExpense onClick={ this.AddExpense } />
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currencyApi: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  FetchApi: (state) => dispatch(fetchApiRequest(state)),
  DispatchExp: (state) => dispatch(dispatchExpense(state)),
});

Wallet.propTypes = {
  FetchApi: PropTypes.func.isRequired,
  DispatchExp: PropTypes.func.isRequired,
  currencyApi: PropTypes.objectOf(PropTypes.any).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
