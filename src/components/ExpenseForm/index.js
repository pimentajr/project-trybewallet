import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CurrencySelect from './currencySelect';
import PaymentMethodSelect from './paymentSelect';
import CategorySelect from './categorySelect';
import { fetchCurrencies, fetchAtualCotation } from '../../actions';

const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const categories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class ExpenseForm extends Component {
  constructor() {
    super();
    this.state = ({
      isLoading: true,
      value: 0,
      description: '',
      currency: null,
      method: paymentMethods[0],
      tag: categories[0],
    });
    this.handleChange = this.handleChange.bind(this);
    this.updateCurrency = this.updateCurrency.bind(this);
    this.loadingToFalse = this.loadingToFalse.bind(this);
  }

  async componentDidMount() {
    const { getCurrencies } = this.props;
    await getCurrencies();
    const { currencies } = this.props;
    this.updateCurrency(currencies[0]);
    this.loadingToFalse();
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

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  saveExpense() {
    const { saveWithAtualCotation } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const expenseInfo = {
      value,
      currency,
      method,
      tag,
      description,
    };
    saveWithAtualCotation(expenseInfo);
  }

  render() {
    const { isLoading, value, description } = this.state;
    return isLoading ? 'Loading' : (
      <form>
        <label htmlFor="expense-value">
          Valor
          <input
            type="number"
            name="value"
            id="expense-value"
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
            value={ description }
            onChange={ (e) => this.handleChange(e) }
          />
        </label>
        <CurrencySelect handleChange={ this.handleChange } />
        <PaymentMethodSelect methods={ paymentMethods } handleChange={ this.handleChange } />
        <CategorySelect tags={ categories } handleChange={ this.handleChange } />
        <button
          type="button"
          onClick={ () => this.saveExpense() }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  saveWithAtualCotation: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  saveWithAtualCotation: (expenseInfo) => dispatch(fetchAtualCotation(expenseInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
