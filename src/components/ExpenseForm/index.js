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
    });
    this.handleChange = this.handleChange.bind(this);
    this.loadingToFalse = this.loadingToFalse.bind(this);
  }

  async componentDidMount() {
    const { getCurrencies } = this.props;
    await getCurrencies();
    this.loadingToFalse();
  }

  async loadingToFalse() {
    this.setState(() => ({
      isLoading: false,
    }));
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  saveExpense() {
    const { getAtualCotation } = this.props;
    getAtualCotation();
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
        <CurrencySelect />
        <PaymentMethodSelect paymentMethods={ paymentMethods } />
        <CategorySelect categories={ categories } />
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
  getAtualCotation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  getAtualCotation: () => dispatch(fetchAtualCotation()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
