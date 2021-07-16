import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setExpense, getCurrenciesThunk } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: -1,
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { getCurrenciesAction } = this.props;
    getCurrenciesAction();
  }

  handleChange({ value, name }) {
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { setExpenseAction, getCurrenciesAction, currencies } = this.props;
    const { id, value, description, currency, method, tag } = this.state;
    getCurrenciesAction();
    const newExpense = {
      id: id + 1,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: currencies,
    };
    setExpenseAction(newExpense);
    this.setState({
      id: id + 1,
    });
  }

  renderHeader() {
    const { user, expenses } = this.props;
    const places = 2;
    let total;
    if (!expenses.length) {
      total = 0;
    } else {
      total = expenses.reduce((acc, cur) => acc + parseInt(cur.value, 10)
      * cur.exchangeRates[`${cur.currency}`].ask, 0);
    }
    return (
      <header className="header">
        <div className="container">
          <h3 className="header-text">TrybeWallet</h3>
          <img src="https://img.icons8.com/color/48/000000/wallet--v2.png" alt="carteira" />
        </div>
        <h3 data-testid="email-field" className="header-text">{user}</h3>
        <h4 data-testid="total-field" className="header-text">
          {total.toFixed(places)}
        </h4>
        <h4 data-testid="header-currency-field" className="header-text">BRL</h4>
      </header>
    );
  }

  renderInputExpense() {
    const { value } = this.state;
    return (
      <form>
        <label htmlFor="expense-input">
          Valor
          <input
            type="number"
            name="value"
            id="expense-input"
            data-testid="expense-input"
            placeholder="Valor"
            value={ value }
            onChange={ (e) => this.handleChange(e.target) }
          />
        </label>
      </form>
    );
  }

  renderInputDescription() {
    const { description } = this.state;
    return (
      <form>
        <label htmlFor="description-input">
          Descrição
          <input
            type="text"
            name="description"
            id="description-input"
            data-testid="description-input"
            placeholder="Descrição"
            value={ description }
            onChange={ (e) => this.handleChange(e.target) }
          />
        </label>
      </form>
    );
  }

  renderSelectCurrency() {
    const { currency } = this.state;
    const { currencies } = this.props;
    const currenciesArray = Object.keys(currencies);
    currenciesArray.splice(currenciesArray.indexOf('USDT'), 1);
    return (
      <form>
        <label htmlFor="selectCurrency">
          Moeda
          <select
            name="currency"
            id="selectCurrency"
            value={ currency }
            onChange={ (e) => this.handleChange(e.target) }
          >
            { currenciesArray.map((moeda, index) => (
              <option key={ index } value={ moeda }>
                { moeda }
              </option>
            ))}
          </select>
        </label>
      </form>
    );
  }

  renderSelectPayment() {
    const { method } = this.state;
    return (
      <form>
        <label htmlFor="selectPayment">
          Método de pagamento
          <select
            name="method"
            id="selectPayment"
            value={ method }
            onChange={ (e) => this.handleChange(e.target) }
          >
            <option value="">--</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de débito">Cartão de débito</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
          </select>
        </label>
      </form>
    );
  }

  renderSelectTag() {
    const { tag } = this.state;
    return (
      <form>
        <label htmlFor="selectTag">
          Tag
          <select
            name="tag"
            id="selectTag"
            value={ tag }
            onChange={ (e) => this.handleChange(e.target) }
          >
            <option value="">--</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </form>
    );
  }

  renderAddExpenseButton() {
    return (
      <button
        type="button"
        className="buttonAdd"
        onClick={ () => this.handleClick() }
      >
        Adicionar Despesa
      </button>
    );
  }

  render() {
    return (
      <>
        {this.renderHeader()}
        <div className="expenseContainer">
          {this.renderInputExpense()}
          {this.renderInputDescription()}
          {this.renderSelectCurrency()}
          {this.renderSelectPayment()}
          {this.renderSelectTag()}
          {this.renderAddExpenseButton()}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  setExpenseAction: (state) => dispatch(setExpense(state)),
  getCurrenciesAction: (state) => dispatch(getCurrenciesThunk(state)),
});

Wallet.propTypes = {
  user: PropTypes.string,
  currencies: PropTypes.string,
  setExpenseAction: PropTypes.func,
  getCurrenciesAction: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
