import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI, newExpense, finishEditExpense } from '../actions';
import Valor from '../components/Valor';
import Descricao from '../components/Descricao';
import Moeda from '../components/Moeda';
import Pagamento from '../components/Pagamento';
import Tag from '../components/Tag';
import Tabela from '../components/Tabela';
import fetchCurrency from '../services/api';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
      id: 0,
    };
    this.handleInput = this.handleInput.bind(this);
    this.addExpense = this.addExpense.bind(this);
    this.changeExpense = this.changeExpense.bind(this);
    // this.updateExpenses = this.updateExpenses.bind(this);
  }

  componentDidMount() {
    const { setCurrencies } = this.props;
    setCurrencies();
  }

  handleInput({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  async addExpense() {
    const { value, description, currency, method, tag, id } = this.state;
    const { setNewExpenses } = this.props;
    const expense = { id, value, description, currency, method, tag };
    const data = await fetchCurrency();
    expense.exchangeRates = data;
    setNewExpenses(expense);
    this.setState({
      id: id + 1,
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
  }

  changeExpense() {
    const { editedExpense, setEditing } = this.props;
    const { value, description, currency, method, tag } = this.state;
    if (value !== '') {
      editedExpense.value = value;
    }
    if (description !== '') {
      editedExpense.description = description;
    }
    if (currency !== '') {
      editedExpense.currency = currency;
    }
    if (method !== '') {
      editedExpense.method = method;
    }
    if (tag !== '') {
      editedExpense.tag = tag;
    }
    setEditing(editedExpense);
    this.setState({
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
  }

  render() {
    const { userEmail, allCurrencies, expenses, editing } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const totalExpenses = expenses.reduce((acc,
      curr) => acc + (curr.value * curr.exchangeRates[curr.currency].ask), 0);
    const currencies = allCurrencies;
    return (
      <div>
        <header>
          <strong data-testid="email-field">{userEmail}</strong>
          <p data-testid="total-field">{(totalExpenses).toFixed(2)}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <Valor value={ value } handleInput={ this.handleInput } />
          <Descricao description={ description } handleInput={ this.handleInput } />
          <Moeda
            currency={ currency }
            currencies={ currencies }
            handleInput={ this.handleInput }
          />
          <Pagamento method={ method } handleInput={ this.handleInput } />
          <Tag tag={ tag } handleInput={ this.handleInput } />
          { !editing ? <button type="button" onClick={ this.addExpense }>Adicionar despesa</button> : <button type="button" onClick={ this.changeExpense }>Editar despesa</button> }
        </form>
        <Tabela />
      </div>
    );
  }
}

const MapStateToProps = (state) => ({
  userEmail: state.user.email,
  allCurrencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editing: state.wallet.editing,
  editedExpense: state.wallet.editedExpense,
});

const MapDispatchToProps = (dispatch) => ({
  setCurrencies: () => dispatch(fetchAPI()),
  setNewExpenses: (expense) => dispatch(newExpense(expense)),
  setEditing: (expense) => dispatch(finishEditExpense(expense)),
});

Wallet.propTypes = {
  userEmail: PropTypes.string,
}.isRequired;

export default connect(MapStateToProps, MapDispatchToProps)(Wallet);
