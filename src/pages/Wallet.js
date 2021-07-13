import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency } from '../actions/index';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      unities: {},
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.getUnities = this.getUnities.bind(this);
    this.changeState = this.changeState.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.totalPrice = this.totalPrice.bind(this);
    this.renderGenInput = this.renderGenInput.bind(this);
  }

  async componentDidMount() {
    this.getUnities();
  }

  async getUnities() {
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const unities = await fetch(url)
      .then((result) => result.json());
    delete unities.USDT;
    this.setState(() => ({
      unities,

    }));
  }

  changeState({ target }) {
    const { name, value } = target;
    this.setState(() => ({ [name]: value }));
  }

  handleButton(event) {
    event.preventDefault();
    const { expenseDispatch } = this.props;
    const { id, value, description, currency, method, tag } = this.state;
    const expense = { id, value, description, currency, method, tag };
    expenseDispatch(expense);
    this.setState((state) => ({
      id: state.id + 1,
    }));
  }

  totalPrice() {
    const { expenses } = this.props;
    return expenses.length > 0
      ? expenses.reduce((total, expense) => {
        const exchange = expense.exchangeRates[expense.currency].ask;
        const mutply = (parseFloat(expense.value) * parseFloat(exchange));
        return total + mutply;
      }, 0).toFixed(2)
      : 0;
  }

  createMethods(array) {
    return array.map((term) => <option key={ term }>{ term }</option>);
  }

  renderGenInput(type, name, id) {
    return <input type={ type } name={ name } id={ id } onChange={ this.changeState } />;
  }

  render() {
    console.log(this.props);
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { email } = this.props;
    const totalSpend = 0;
    const { unities } = this.state;
    const unitiesKey = Object.keys(unities);
    return (
      <div>
        <h1>TrybeWallet</h1>
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">{`Despesa total: ${totalSpend}`}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <label htmlFor="value">
            Valor:
            { this.renderGenInput('number', 'value', 'inp-val') }
          </label>
          <label htmlFor="description">
            Descrição:
            { this.renderGenInput('text', 'description', 'inp-desc') }
          </label>
          <label htmlFor="unity">
            Moeda:
            <select name="unity" id="unity" aria-label="Moeda:">
              {this.createMethods(unitiesKey)}
            </select>
          </label>
          <label htmlFor="tagSelect">
            Método de pagamento:
            <select name="method" id="tagSelect">
              {this.createMethods(methods)}
            </select>
          </label>
          <label htmlFor="tags">
            Tag:
            <select name="tag" id="tags">
              {this.createMethods(tags)}
            </select>
          </label>
          <button type="submit" onClick={ this.handleButton }>
            Adicionar despesa
          </button>
        </form>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  expenseDispatch: (state) => dispatch(fetchCurrency(state)) });

Wallet.propTypes = {
  email: PropTypes.string,
  expenseDispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
