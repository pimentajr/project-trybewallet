import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as userAction from '../../actions';

class ExpenseForm extends React.Component {
  constructor() {
    super();

    this.addExpenseOnStore = this.addExpenseOnStore.bind(this);
    this.moneyHChange = this.moneyHChange.bind(this);
    this.describeHChange = this.describeHChange.bind(this);
    this.currencyHChange = this.currencyHChange.bind(this);
    this.payMethodHChange = this.payMethodHChange.bind(this);
    this.tagHChange = this.tagHChange.bind(this);

    this.state = {
      currencys: [],
      expense: {
        money: 0,
        describe: '',
        currency: 'USD',
        payMethod: 'Dinheiro',
        tag: 'Alimentação',
      },
    };
  }

  async componentDidMount() {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const allCurrencys = await response.json();
    // const currencys = Object.keys(allCurrencys).filter((currency) => {
    //  const lenght = 3;
    //  return currency.length <= lenght;
    // });
    const { USDT, DOGE, ...currencys } = allCurrencys;

    this.setCurrencysOnState(currencys);
  }

  setCurrencysOnState(arr) {
    this.setState({ currencys: arr });
  }

  moneyHChange({ target: { value } }) {
    this.setState((prevState) => ({
      expense: {
        ...prevState.expense,
        money: value,
      },
    }));
  }

  describeHChange({ target: { value } }) {
    this.setState((prevState) => ({
      expense: {
        ...prevState.expense,
        describe: value,
      },
    }));
  }

  currencyHChange({ target: { value } }) {
    this.setState((prevState) => ({
      expense: {
        ...prevState.expense,
        currency: value,
      },
    }));
  }

  payMethodHChange({ target: { value } }) {
    this.setState((prevState) => ({
      expense: {
        ...prevState.expense,
        payMethod: value,
      },
    }));
  }

  tagHChange({ target: { value } }) {
    this.setState((prevState) => ({
      expense: {
        ...prevState.expense,
        tag: value,
      },
    }));
  }

  addExpenseOnStore() {
    const { saveExpense, userExpenses } = this.props;
    const { expense } = this.state;

    let idCounter = 0;
    if (userExpenses) {
      idCounter = userExpenses.length;
    }

    const expenseObj = {
      id: idCounter,
      value: expense.money,
      description: expense.describe,
      currency: expense.currency,
      method: expense.payMethod,
      tag: expense.tag,
    };

    saveExpense(expenseObj);
  }

  render() {
    const { currencys } = this.state;

    return (
      <div>
        <form>
          <label htmlFor="money-value">
            Valor
            <input type="number" id="money-value" onChange={ this.moneyHChange } />
          </label>
          <label htmlFor="describe">
            Descrição
            <input type="text" id="describe" onChange={ this.describeHChange } />
          </label>
          <label htmlFor="currency">
            Moeda
            <select id="currency" onChange={ this.currencyHChange }>
              {Object.keys(currencys).map((item, index) => (
                <option key={ index }>{item}</option>
              ))}
            </select>
          </label>
          <label htmlFor="pay-method">
            Método de pagamento
            <select id="pay-method" onChange={ this.payMethodHChange }>
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            tag
            <select id="tag" onChange={ this.tagHChange }>
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
        <button
          type="button"
          onClick={ this.addExpenseOnStore }
        >
          Adicionar Despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (expenseObj) => dispatch(userAction.getCurrencies(expenseObj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);

ExpenseForm.propTypes = {
  saveExpense: PropTypes.func.isRequired,
  userExpenses: {
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    target: PropTypes.string,
    exchangeRates: PropTypes.object,
  }.isRequired,
};
