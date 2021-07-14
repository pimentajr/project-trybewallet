import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi, addExpense } from '../actions';

class ExpensesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      value: 0,
      currency: '',
      method: '',
      tag: '',
    };
  }

  componentDidMount() {
    const { fetchApiCurrency } = this.props;
    fetchApiCurrency();
  }

  currenciesOptions() {
    const { currencies } = this.props;
    return Object.keys(currencies).filter((curr) => curr !== 'USDT');
  }

  handleValue() {
    return (
      <label htmlFor="value">
        valor:
        <input
          id="value"
          name="value"
          type="number"
          onChange={ ({ target }) => this.handleChange(target) }
        />
      </label>
    );
  }

  handleDescription() {
    return (
      <label htmlFor="description">
        Descrição:
        <input
          id="description"
          name="description"
          type="text"
          onChange={ ({ target }) => this.handleChange(target) }
        />
      </label>
    );
  }

  handleCurrency() {
    return (
      <label htmlFor="currency">
        Moeda:
        <select
          id="currency"
          name="currency"
          onChange={ ({ target }) => this.handleChange(target) }
        >
          {this.currenciesOptions().map((moeda) => (
            <option key={ moeda } value={ moeda }>{moeda}</option>
          ))}
        </select>
      </label>
    );
  }

  handleMethod() {
    return (
      <label htmlFor="method">
        Método de pagamento:
        <select
          id="method"
          name="method"
          onChange={ ({ target }) => this.handleChange(target) }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  handleTag() {
    return (
      <label htmlFor="tag">
        Tag:
        <select
          id="tag"
          name="tag"
          onChange={ ({ target }) => this.handleChange(target) }
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

  handleChange({ name, value }) {
    this.setState({ [name]: value });
  }

  handleBtn() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, add, walletExpenses } = this.props;
    const expenses = {
      id: walletExpenses.length,
      description,
      value,
      currency,
      method,
      tag,
      exchangeRates: currencies,
    };
    add(expenses);
  }

  render() {
    return (
      <div>
        <form>
          {this.handleTag()}
          {this.handleDescription()}
          {this.handleValue()}
          {this.handleCurrency()}
          {this.handleMethod()}
          <input
            type="button"
            value="Adicionar despesa"
            onClick={ () => this.handleBtn() }
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  walletExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApiCurrency: () => dispatch(fetchApi()),
  add: (expenses, currencies) => dispatch(addExpense(expenses, currencies)),
});

ExpensesForm.propTypes = {
  fetchApiCurrency: PropTypes.func,
  add: PropTypes.func,
  walletExpenses: PropTypes.arrayOf(PropTypes.object),
  currencies: PropTypes.shape({ Object }),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
