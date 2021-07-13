import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WalletFetchedCurrencies from './WalletFetchedCurrencies';
import PaymentMethods from './PaymentMethods';
import TagCategories from './TagCategories';
import { editExpense, fetchCurrencies, addExpense } from '../actions/wallet';
import './WalletForm.css';

class WalletForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddBtn = this.handleAddBtn.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleAddBtn() {
    const { fetchCurrenciesAPI, addNewExpense, currentRates } = this.props;
    const { state } = this;
    fetchCurrenciesAPI();
    addNewExpense({ ...state, exchangeRates: currentRates });
    this.setState((previousState) => ({
      id: previousState.id + 1,
    }));
  }

  renderSelectInputs() {
    return (
      <>
        <label htmlFor="moeda">
          Moeda:
          <select
            className="form-input"
            data-testid="currency-input"
            id="moeda"
            name="currency"
            onChange={ this.handleChange }
          >
            <WalletFetchedCurrencies />
          </select>
        </label>
        <label htmlFor="metodo-de-pagamento">
          Método de pagamento:
          <select
            className="form-input"
            data-testid="method-input"
            name="method"
            onChange={ this.handleChange }
            id="metodo-de-pagamento"
          >
            <PaymentMethods />
          </select>
        </label>
        <label htmlFor="categoria">
          Tag:
          <select
            className="form-input"
            data-testid="tag-input"
            id="categoria"
            name="tag"
            onChange={ this.handleChange }
          >
            <TagCategories />
          </select>
        </label>
      </>
    );
  }

  renderButtons() {
    const { enableEditButton, editCurrentExpense } = this.props;
    const { state } = this;
    if (!enableEditButton) {
      return (
        <button className="form-btn" type="button" onClick={ this.handleAddBtn }>
          Adicionar despesa
        </button>
      );
    }

    if (enableEditButton) {
      return (
        <button
          className="form-btn"
          type="button"
          onClick={ () => editCurrentExpense(state) }
        >
          Editar despesa
        </button>
      );
    }
  }

  render() {
    return (
      <form className="wallet-form">
        <label htmlFor="valor">
          Valor:
          <input
            className="form-input"
            data-testid="value-input"
            name="value"
            type="number"
            onChange={ this.handleChange }
            id="valor"
          />
        </label>
        <label htmlFor="descricao">
          Descrição:
          <input
            className="form-input"
            data-testid="description-input"
            name="description"
            type="text"
            onChange={ this.handleChange }
            id="descricao"
          />
        </label>
        { this.renderSelectInputs() }
        { this.renderButtons() }
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  enableEditButton: state.wallet.enableEdit,
  currentRates: state.wallet.currentRates,
  editExpense: state.wallet.expenseToEdit,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  addNewExpense: (state) => dispatch(addExpense(state)),
  editCurrentExpense: (state) => dispatch(editExpense(state)),
  fetchCurrenciesAPI: () => dispatch(fetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);

WalletForm.propTypes = {
  addNewExpense: PropTypes.func.isRequired,
  enableEditButton: PropTypes.func.isRequired,
  fetchCurrenciesAPI: PropTypes.func.isRequired,
  currentRates: PropTypes.objectOf().isRequired,
  editCurrentExpense: PropTypes.func.isRequired,

};
