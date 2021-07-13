import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency } from '../actions/Wallet';

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
    return expenses.reduce((total, expense) => {
      const exchange = expense.exchangeRates[expense.currency].ask;
      const converted = (parseFloat(expense.value) * parseFloat(exchange));
      return total + converted;
    }, 0).toFixed(2);
  }

  createMethods(array) {
    return array.map((term) => <option key={ term }>{ term }</option>);
  }

  renderGenInput(type, name, id) {
    return <input type={ type } name={ name } id={ id } onChange={ this.changeState } />;
  }

  render() {
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { email } = this.props;
    const { unities } = this.state;
    const unitiesKey = Object.keys(unities);
    return (
      <div>
        <header>
          <span data-testid="email-field">{ email }</span>
          <span data-testid="total-field">
            { this.totalPrice() }
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <form>
          <label htmlFor="Value">
            Valor:
            { this.renderGenInput('number', 'value', 'Value') }
          </label>
          <label htmlFor="Description">
            Descrição:
            { this.renderGenInput('text', 'description', 'Description') }
          </label>
          <label htmlFor="unity">
            Moeda:
            <select name="currency" id="unity" onChange={ this.changeState }>
              {this.createMethods(unitiesKey)}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select name="method" id="method" onChange={ this.changeState }>
              {this.createMethods(methods)}
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select name="tag" id="tag" onChange={ this.changeState }>
              {this.createMethods(tags)}
            </select>
          </label>
          <button type="submit" onClick={ this.handleButton }>
            Adicionar despesa
          </button>
        </form>
      </div>
    );
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
