import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveExpenseAction } from '../actions';
import CurrencyInput from './CurrencyInput';

class EditExpenseForm extends Component {
  constructor(props) {
    super(props);
    const { expenses, editingExpenseId } = this.props;
    const {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    } = expenses.find((expense) => expense.id === editingExpenseId);
    this.state = {
      expense: {
        id,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates,
      },
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.renderValueInput = this.renderValueInput.bind(this);
    this.renderDescriptionInput = this.renderDescriptionInput.bind(this);
    this.renderTagInput = this.renderTagInput.bind(this);
    this.renderPaymentMethodInput = this.renderPaymentMethodInput.bind(this);
    this.renderCurrencyInput = this.renderCurrencyInput.bind(this);
    this.handleSaveExpense = this.handleSaveExpense.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleInputChange({ target }) {
    const { name, value } = target;
    this.setState(({ expense }) => ({ expense: { ...expense, [name]: value } }));
  }

  handleValueChange(value) {
    this.setState(({ expense }) => ({ expense: { ...expense, value } }));
  }

  handleSaveExpense() {
    const { saveExpense } = this.props;
    const { expense } = this.state;
    saveExpense({ ...expense });
  }

  renderValueInput() {
    const { expense: { value, currency } } = this.state;
    return (
      <CurrencyInput
        id="value-input"
        value={ value }
        currency={ currency }
        onValueChange={ this.handleValueChange }
      />
    );
  }

  renderDescriptionInput() {
    const { expense: { description } } = this.state;
    return (
      <label htmlFor="description-input">
        Descrição:
        <input
          data-testid="description-input"
          name="description"
          value={ description }
          onChange={ this.handleInputChange }
        />
      </label>
    );
  }

  renderCurrencyInput() {
    const { expense: { currency, exchangeRates } } = this.state;
    return (
      <label htmlFor="currency-input">
        Moeda:
        <select
          id="currency-input"
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ this.handleInputChange }
        >
          {
            Object.keys(exchangeRates).map((currencyCode) => (
              <option key={ currencyCode } value={ currencyCode }>{currencyCode}</option>
            ))
          }
        </select>
      </label>
    );
  }

  renderPaymentMethodInput() {
    const { expense: { method } } = this.state;
    return (
      <label htmlFor="method-input">
        Método de pagamento:
        <select
          id="method-input"
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ this.handleInputChange }
        >
          <option vaue="Dinheiro">Dinheiro</option>
          <option value="Cartão de débito">Cartão de débito</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
        </select>
      </label>
    );
  }

  renderTagInput() {
    const { expense: { tag } } = this.state;
    return (
      <label htmlFor="tag">
        Tag:
        <select
          id="tag-input"
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ this.handleInputChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }

  render() {
    return (
      <form className="expense-form">
        {this.renderCurrencyInput()}
        {this.renderValueInput()}
        {this.renderDescriptionInput()}
        {this.renderPaymentMethodInput()}
        {this.renderTagInput()}
        <button type="button" onClick={ this.handleSaveExpense }>Editar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  editingExpenseId: state.wallet.editingExpenseId,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (expense) => dispatch(saveExpenseAction(expense)),
});

EditExpenseForm.propTypes = {
  saveExpense: PropTypes.func.isRequired,
  editingExpenseId: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpenseForm);
