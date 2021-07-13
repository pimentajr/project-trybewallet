import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMoedasThunk, addExpense } from '../actions';

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      total: 0,
      id: 0,
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    });

    this.optionGenerator = this.optionGenerator.bind(this);
    this.changeNator = this.changeNator.bind(this);
    this.headerGenerator = this.headerGenerator.bind(this);
    this.expensesSaver = this.expensesSaver.bind(this);
    this.setTotalState = this.setTotalState.bind(this);
  }

  componentDidMount() {
    const { getApi } = this.props;
    getApi();
  }

  setTotalState(receivedValue, receivedAsk) {
    const requestAsk = Object.entries(receivedAsk);
    const actualAsk = requestAsk[0][1];
    const { ask } = actualAsk;
    const { total } = this.state;
    const convertedValue = receivedValue * ask;
    if (total === 0) {
      this.setState({ total: convertedValue });
    } else {
      const newTotal = parseFloat(total) + parseFloat(convertedValue);
      this.setState({ total: newTotal });
    }
  }

  changeNator({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  optionGenerator() {
    const { apiMoedas } = this.props;
    if (apiMoedas !== undefined) {
      const allCoins = apiMoedas.map(((moeda) => Object.keys(moeda).filter((key) => (
        key !== 'USDT'))));
      return (
        <label htmlFor="currency">
          Moeda
          <select
            id="currency"
            name="currency"
            onChange={ this.changeNator }
          >
            {[...allCoins].map((coin) => coin.map((c, i) => (
              <option value={ c } key={ i }>{ c }</option>)))}
          </select>
        </label>
      );
    }
  }

  headerGenerator() {
    const { userEmail } = this.props;
    const { total } = this.state;
    return (
      <>
        <h1 data-testid="email-field">{ userEmail }</h1>
        <span data-testid="total-field">{ total }</span>
      </>
    );
  }

  expensesSaver() {
    const { sendExpenses, getApi, apiMoedas } = this.props;
    getApi();
    const { id, value, description, currency, method, tag } = this.state;
    const requestRates = { ...apiMoedas };
    const takeRates = Object.entries(requestRates);
    const exchangeRates = takeRates[0][1];
    const takeAsk = Object.keys(exchangeRates).reduce((filtered, key) => {
      if (currency.includes(exchangeRates[key].code)) {
        filtered[key] = exchangeRates[key];
      }
      return filtered;
    }, {});
    this.setTotalState(value, takeAsk);
    sendExpenses({ id, value, description, currency, method, tag, exchangeRates });
    this.setState({ id: id + 1 });
    console.log('enviado');
  }

  render() {
    return (
      <div>
        { this.headerGenerator() }
        <p data-testid="header-currency-field">BRL</p>
        <form>
          <label htmlFor="value">
            Valor
            <input type="number" name="value" id="value" onChange={ this.changeNator } />
          </label>
          <label htmlFor="description">
            Descrição
            <input
              type="text"
              name="description"
              id="description"
              onChange={ this.changeNator }
            />
          </label>
          { this.optionGenerator() }
          <label htmlFor="method">
            Método de pagamento
            <select id="method" onChange={ this.changeNator } name="method">
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag
            <select id="tag" onChange={ this.changeNator } name="tag">
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ this.expensesSaver }>Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  apiMoedas: PropTypes.arrayOf.isRequired,
  getApi: PropTypes.func.isRequired,
  sendExpenses: PropTypes.func.isRequired,
  // savedExpenses: PropTypes.arrayOf.isRequired,
};

const MapStateToProps = (state) => ({
  userEmail: state.user.email,
  apiMoedas: state.wallet.moedas,
  savedExpenses: state.wallet.expenses,
});

const MapDispatchToProps = (dispatch) => ({
  getApi: () => dispatch(getMoedasThunk()),
  sendExpenses: (expenses) => dispatch(addExpense(expenses)),
});

export default connect(MapStateToProps, MapDispatchToProps)(Wallet);
