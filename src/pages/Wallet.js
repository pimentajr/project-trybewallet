import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI, addExpense, removeExpense, editExpense } from '../actions';
import ExpensesTable from '../components/ExpensesTable';
import CreateSelect from '../components/CreateSelect';

const payments = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
const initialState = {
  value: '',
  description: '',
  currency: '',
  method: payments[0],
  tag: tags[0],
};

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.addExpenseWallet = this.addExpenseWallet.bind(this);
    this.editExpenseWallet = this.editExpenseWallet.bind(this);
    this.handleForm = this.handleForm.bind(this);
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  async fetchCurrencies() {
    const { reqApiAction } = this.props;
    await reqApiAction();
    const { currencies } = this.props;
    this.setState({ currency: Object.keys(currencies)[0] });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  totalExpenses(expenses) {
    const total = expenses.reduce((acc, exp) => (
      acc + exp.value * exp.exchangeRates[exp.currency].ask), 0);
    return (parseFloat(total).toFixed(2));
  }

  handleForm(expense) {
    this.setState(expense);
  }

  addExpenseWallet(expense) {
    const { reqApiAction, addExpenseAction, currencies } = this.props;
    reqApiAction();
    addExpenseAction(expense);
    this.setState({ ...initialState, currency: Object.keys(currencies)[0] });
  }

  editExpenseWallet(expense) {
    const { editExpenseAction, currencies } = this.props;
    editExpenseAction(expense);
    this.setState({ ...initialState, currency: Object.keys(currencies)[0] });
  }

  createInput(name, label, value, dataTestId) {
    return (
      <label htmlFor={ name }>
        { label }
        <input
          data-testid={ dataTestId }
          id={ name }
          type="text"
          name={ name }
          onChange={ this.handleChange }
          value={ value }
        />
      </label>
    );
  }

  renderHeader() {
    const { userEmail, expenses } = this.props;
    return (
      <header>
        <p data-testid="email-field">{ userEmail }</p>
        <p data-testid="total-field">
          { expenses.length > 0 ? this.totalExpenses(expenses) : 0}
        </p>
        <p data-testid="header-currency-field">BRL</p>
        <h3>TrybeWallet</h3>
      </header>
    );
  }

  renderSelects() {
    const { currency, method, tag } = this.state;
    const { currencies } = this.props;
    const currArray = Object.keys(currencies).filter((curr) => curr !== 'USDT');
    return (
      <>
        <CreateSelect
          name="currency"
          dataTestid="currency-input"
          label="Moeda"
          options={ currArray }
          value={ currency }
          handleChange={ this.handleChange }
        />
        <CreateSelect
          name="method"
          dataTestid="method-input"
          label="Método de pagamento"
          options={ payments }
          value={ method }
          handleChange={ this.handleChange }
        />
        <CreateSelect
          name="tag"
          dataTestid="tag-input"
          label="Tag"
          options={ tags }
          value={ tag }
          handleChange={ this.handleChange }
        />
      </>
    );
  }

  renderExpenseForm() {
    const { value, currency, method, description, tag } = this.state;
    const { isEditingExpense } = this.props;
    const form = { value, currency, method, description, tag };
    const btnAddExpense = (
      <button type="button" onClick={ () => this.addExpenseWallet(form) }>
        Adicionar despesa
      </button>);
    const btnEditExpense = (
      <button type="button" onClick={ () => this.editExpenseWallet(this.state) }>
        Editar despesa
      </button>);

    return (
      <form>
        { this.createInput('value', 'Valor', value, 'value-input') }
        { this.createInput('description', 'Descrição', description, 'description-input') }
        { this.renderSelects() }
        { isEditingExpense ? btnEditExpense : btnAddExpense }
      </form>
    );
  }

  render() {
    const { loadingCurrencies } = this.props;
    return (
      <div>
        { this.renderHeader() }
        <main>
          { loadingCurrencies ? <p>Carregando...</p> : this.renderExpenseForm() }
          <ExpensesTable handleForm={ this.handleForm } />
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  currencies: state.wallet.currencies,
  loadingCurrencies: state.wallet.isLoading,
  expenses: state.wallet.expenses,
  currentExpense: state.wallet.currentExpense,
  isEditingExpense: state.wallet.isEditingExpense,
});

const mapDispatchToProps = (dispatch) => ({
  reqApiAction: () => dispatch(fetchAPI()),
  addExpenseAction: (payload) => dispatch(addExpense(payload)),
  removeExpenseAction: (payload) => dispatch(removeExpense(payload)),
  editExpenseAction: (payload) => dispatch(editExpense(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = ({
  userEmail: PropTypes.string,
  currencies: PropTypes.shape({ Object }),
  loadingCurrencies: PropTypes.bool,
}).isRequired;
