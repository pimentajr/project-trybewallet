import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi, fetchExchangeRates } from '../actions';
import ExpensesSelects from './ExpensesSelects';

class Expenses extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
      currenciesArr: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBtn = this.handleBtn.bind(this);
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  async fetchCurrencies() {
    const { currencies } = this.props;
    const currenciesObj = await currencies();
    const currenciesKeys = Object.keys(currenciesObj.payload);
    const arr = [];
    currenciesKeys.map((currency) => currency !== 'USDT' && arr.push(currency));
    this.setState({ currenciesArr: arr });
  }

  handleChange({ target }) {
    const { name, value } = target;
    console.log(value);
    this.setState({
      [name]: value,
    });
  }

  handleBtn(e) {
    const { dispatchExchangeRates } = this.props;
    e.preventDefault();
    const { id, value, description, currency, method, tag, exchangeRates } = this.state;
    this.setState({ id: id + 1 });
    const obj = { id, value, description, currency, method, tag, exchangeRates };
    dispatchExchangeRates(obj);
  }

  render() {
    const { value, description, currency, currenciesArr } = this.state;
    return (
      <form>
        <label htmlFor="valor">
          Valor
          <input
            value={ value }
            name="value"
            id="valor"
            type="number"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="descricao">
          Descrição
          <textarea
            value={ description }
            name="description"
            id="descricao"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="moeda">
          Moeda:
          <select
            id="moeda"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currenciesArr.map((cur, index) => <option key={ index }>{ cur }</option>)}
          </select>
        </label>
        <ExpensesSelects onChange={ this.handleChange } />
        <button type="button" onClick={ this.handleBtn }>Adicionar Despesa</button>
      </form>
    );
  }
}

Expenses.propTypes = {
  currencies: PropTypes.func.isRequired,
  dispatchExchangeRates: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  currencies: () => dispatch(fetchApi()),
  dispatchExchangeRates: (Obj) => dispatch(fetchExchangeRates(Obj)),
});

export default connect(null, mapDispatchToProps)(Expenses);
