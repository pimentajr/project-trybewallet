import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { apiFetching, addExpenses } from '../actions';

class ExpensesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
      exchangeRates: {},
    };
    this.s = this.s.bind(this);
    this.sendExpense = this.sendExpense.bind(this);
  }

  async sendExpense() {
    const { dispatchExpenses, expenses, currencies, currenciesFromAPI } = this.props;
    await currenciesFromAPI();
    this.setState({ exchangeRates: currencies });
    const id = expenses.length;
    const expense = { ...this.state, id };
    dispatchExpenses(expense);
    this.setState({
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
  }

  s({ target }) {
    this.setState({ [target.id]: target.value });
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const currencyObject = Object.keys(currencies).filter((curr) => curr !== 'USDT');
    return (
      <form>
        <label htmlFor="value" name="value">
          Valor
          <input type="text" id="value" value={ value } onChange={ this.s } />
        </label>
        <label htmlFor="description">
          Descrição:
          <input type="text" id="description" value={ description } onChange={ this.s } />
        </label>
        <label htmlFor="currency" name="currency">
          Moeda
          <select id="currency" value={ currency } onChange={ this.s }>
            {currencyObject.map((moneyType) => (
              <option key={ moneyType } value={ moneyType }>
                { moneyType }
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento
          <select id="method" name="method" value={ method } onChange={ this.s }>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select id="tag" name="tag" value={ tag } onChange={ this.s }>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button type="button" onClick={ this.sendExpense }>Adicionar Despesa</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  currenciesFromAPI: () => dispatch(apiFetching()),
  dispatchExpenses: (expense) => dispatch(addExpenses(expense)),
});

const mapStateToProps = ({ wallet: { currencies, expenses } }) => ({
  currencies,
  expenses,
});

ExpensesForm.propTypes = {
  currencies: propTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
