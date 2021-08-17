import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as currenciesActions from '../actions/index';
import HeaderTable from '../components/HeaderTable';
import HeaderWallet from '../components/HeaderWallet';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalExpense: 0,
      currentCurrency: 'BRL',
      shouldRenderForm: false,
      value: '',
      description: '',
      chosenCurrency: 'USD',
      method: '',
      tag: '',
    };
    this.showCurrencies = this.showCurrencies.bind(this);
  }

  componentDidMount() {
    this.showCurrencies();
  }

  removeExpense(id) {
    const { expenses, removeExpense } = this.props;
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    let totalExpense = 0;
    newExpenses.forEach((expense) => {
      const expnseValue = expense.value * expense.exchangeRates[expense.currency].ask;
      totalExpense += expnseValue;
    });
    this.setState((prevState) => ({
      ...prevState,
      totalExpense,
    }));
    removeExpense(newExpenses);
  }

  showCurrencies() {
    const { getCurrencies } = this.props;
    getCurrencies();
    this.setState({ shouldRenderForm: true });
  }

  addExpense() {
    const { getCurrencies } = this.props;
    getCurrencies(); // getCurrencies atualiza valor de currencies na store do redux
    const { value, description, chosenCurrency, method, tag } = this.state;
    const { currencies, addNewExpense, expenses } = this.props;
    const newExpense = {
      id: expenses.length,
      value,
      currency: chosenCurrency,
      method,
      tag,
      description,
      exchangeRates: currencies,
    };
    addNewExpense(newExpense);
    const askToConvert = currencies[chosenCurrency].ask;
    this.setState((prevState) => ({
      ...prevState,
      totalExpense: prevState.totalExpense + (value * askToConvert),
    }));
  }

  renderMethodAndTag() {
    return (
      <div>
        <label htmlFor="pagamento">
          Método de pagamento :
          <select
            id="pagamento"
            onChange={ (e) => this.setState({ method: e.target.value }) }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        {' '}
        <br />
        <label htmlFor="tag">
          Tag :
          <select
            id="tag"
            onChange={ (e) => this.setState({ tag: e.target.value }) }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </div>
    );
  }

  renderTable() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <HeaderTable />
          { expenses.map((expense, index) => {
            const valueToConvert = expense.value;
            const exchangeRate = expense.exchangeRates[expense.currency].ask;
            const convertedValue = valueToConvert * exchangeRate;
            return (
              <tr key={ index }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ expense.value }</td>
                <td>{ expense.exchangeRates[expense.currency].name }</td>
                <td>
                  { (Math.round(exchangeRate * 100) / 100) }
                </td>
                <td>
                  {
                    Math.round(convertedValue * 100) / 100
                  }
                </td>
                <td>Real</td>
                <td>
                  <button
                    id={ expense.id }
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.removeExpense(index, convertedValue) }
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }

  renderHeader() {
    const { userEmail } = this.props;
    const { totalExpense, currentCurrency } = this.state;
    return (
      <HeaderWallet
        userEmail={ userEmail }
        totalExpense={ totalExpense }
        currentCurrency={ currentCurrency }
      />
    );
  }

  renderForm() {
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="value">
          Valor :
          <input
            id="value"
            type="text"
            name="valor"
            onChange={ (e) => this.setState({ value: e.target.value }) }
          />
        </label>
        <br />
        <label htmlFor="description">
          Descrição :
          <textarea
            id="description"
            type="text"
            name="description"
            onChange={ (e) => this.setState({ description: e.target.value }) }
          />
        </label>
        <br />
        <label htmlFor="moeda">
          Moeda :
          <select
            id="moeda"
            onChange={ (e) => this.setState({ chosenCurrency: e.target.value }) }
          >
            { Object.keys(currencies).map((currency) => {
              if (currency !== 'USDT' && currency !== 'DOGE') {
                return (
                  <option key={ currency } value={ currency }>{ currency }</option>
                );
              } return null;
            }) }
          </select>
        </label>
        <br />
        { this.renderMethodAndTag() }
        <br />
        <button type="button" onClick={ () => this.addExpense() }>
          Adicionar despesa
        </button>
      </form>
    );
  }

  render() {
    const { shouldRenderForm } = this.state;
    const { expenses } = this.props;
    return (
      <div>
        <span>{ this.renderHeader() }</span>
        <span>{ !shouldRenderForm ? <p>Carregando...</p> : this.renderForm() }</span>
        <br />
        <div>
          {' '}
          { expenses.length === 0 ? <div /> : this.renderTable() }
          {' '}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => { dispatch(currenciesActions.getCurrencies()); },
  addNewExpense: (newExpense) => dispatch(currenciesActions.addExpense(newExpense)),
  removeExpense: (newExpenses) => dispatch(currenciesActions.removeExpense(newExpenses)),
});

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  getCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  addNewExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
