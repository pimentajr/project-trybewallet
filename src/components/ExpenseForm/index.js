import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CurrencySelect from './currencySelect';
import PaymentMethodSelect from './paymentSelect';
import CategorySelect from './categorySelect';
import { fetchCurrencies, fetchAtualCotation, saveEdited } from '../../actions';

const payMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const categories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class ExpenseForm extends Component {
  constructor() {
    super();
    this.state = ({
      isLoading: true,
      value: 0,
      description: '',
      currency: null,
      method: payMethods[0],
      tag: categories[0],
      editing: false,
    });
    this.handleChange = this.handleChange.bind(this);
    this.updateCurrency = this.updateCurrency.bind(this);
    this.loadingToFalse = this.loadingToFalse.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  async componentDidMount() {
    const { getCurrencies } = this.props;
    await getCurrencies();
    const { currencies } = this.props;
    this.updateCurrency(currencies[0]);
    this.loadingToFalse();
  }

  shouldComponentUpdate(nextProps) {
    const { editingId } = nextProps;
    this.isEditing(editingId);
    return true;
  }

  async loadingToFalse() {
    this.setState(() => ({
      isLoading: false,
    }));
  }

  async updateCurrency(currency) {
    this.setState(() => ({
      currency,
    }));
  }

  async resetState() {
    const { currencies } = this.props;
    this.setState(() => ({
      value: 0,
      description: '',
      currency: currencies[0],
      method: payMethods[0],
      tag: categories[0],
      editing: false,
    }));
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  async saveExpense() {
    const { saveWithAtualCotation } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const expenseInfo = {
      value,
      currency,
      method,
      tag,
      description,
    };
    await saveWithAtualCotation(expenseInfo);
    this.resetState();
  }

  async editExpense(editingId) {
    const { value, description, currency, method, tag } = this.state;
    const { saveEditedExpense } = this.props;
    const expenseInfo = {
      value,
      currency,
      method,
      tag,
      description,
    };
    await saveEditedExpense(editingId, expenseInfo);
    this.resetState();
  }

  isEditing(editingId) {
    const { editing } = this.state;
    if (editingId >= 0 && !editing) {
      const { expenses } = this.props;
      const expenseToEdit = expenses.find((expense) => expense.id === editingId);
      const { value, description, currency, method, tag } = expenseToEdit;
      this.setState(() => ({
        value,
        description,
        currency,
        method,
        tag,
        editing: true,
      }));
    }
  }

  render() {
    const { editingId } = this.props;
    const { isLoading, value, description } = this.state;
    return isLoading ? 'Loading' : (
      <form>
        <label htmlFor="expense-value">
          Valor
          <input
            type="number"
            name="value"
            id="expense-value"
            data-testid="value-input"
            value={ value }
            onChange={ (e) => this.handleChange(e) }
          />
        </label>
        <label htmlFor="expense-description">
          Descrição
          <input
            type="text"
            name="description"
            id="expense-description"
            data-testid="description-input"
            value={ description }
            onChange={ (e) => this.handleChange(e) }
          />
        </label>
        <CurrencySelect handleChange={ this.handleChange } />
        <PaymentMethodSelect methods={ payMethods } handleChange={ this.handleChange } />
        <CategorySelect tags={ categories } handleChange={ this.handleChange } />
        <button
          type="button"
          onClick={
            editingId < 0 ? () => this.saveExpense() : () => this.editExpense(editingId)
          }
        >
          {editingId < 0 ? 'Adicionar despesa' : 'Editar despesa'}
        </button>
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  saveWithAtualCotation: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editingId: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  saveEditedExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editingId: state.wallet.editingId,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  saveWithAtualCotation: (expenseInfo) => dispatch(fetchAtualCotation(expenseInfo)),
  saveEditedExpense:
    (editingId, expenseInfo) => dispatch(saveEdited(editingId, expenseInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
