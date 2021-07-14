import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrency, addExpense } from '../actions';

const INITIAL_STATE = {
  id: '',
  description: '',
  value: 0,
  currency: '',
  method: '',
  tag: '',
};

class ExpensesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    const { APICurrency } = this.props;
    APICurrency();
  }

  description() {
    const { editExpense } = this.props;
    const { description } = this.state;
    return (
      <label htmlFor="description">
        Descrição:
        <input
          id="description"
          name="description"
          type="text"
          value={ editExpense.isEditind ? editExpense.description : description }
          onChange={ ({ target }) => this.handleChange(target) }
        />
      </label>
    );
  }

  expenseValue() {
    const { editExpense: { value } } = this.props;
    return (
      <label htmlFor="value">
        Valor:
        <input
          id="value"
          name="value"
          type="number"
          placeholder="0"
          // value={ value }
          onChange={ ({ target }) => this.handleChange(target) }
        />
      </label>
    );
  }

  currenciesOptions() {
    const { currencies } = this.props;
    return Object.keys(currencies).filter((curr) => curr !== 'USDT');
  }

  currency() {
    const { editExpense: { currency } } = this.props;
    return (
      <label htmlFor="currency">
        Moeda:
        <select
          id="currency"
          name="currency"
          onChange={ ({ target }) => this.handleChange(target) }
          // select={ currency }
        >
          <option
            selected={ currency === '' }
            value=""
            key="initial"
          >
            Selecione uma moeda
          </option>
          {this.currenciesOptions().map((moeda) => (
            <option
              selected={ currency === moeda }
              key={ moeda }
              value={ moeda }
            >
              {moeda}
            </option>
          ))}
        </select>
      </label>
    );
  }

  paymentMethod() {
    const { editExpense: { method } } = this.props;
    return (
      <label htmlFor="method">
        Método de pagamento:
        <select
          id="method"
          name="method"
          onChange={ ({ target }) => this.handleChange(target) }
          select={ method }
        >
          <option selected={ method === '' } value="">
            Forma de pagamento
          </option>
          <option selected={ method === 'Dinheiro' } value="Dinheiro">
            Dinheiro
          </option>
          <option selected={ method === 'Cartão de crédito' } value="Cartão de crédito">
            Cartão de crédito
          </option>
          <option selected={ method === 'Cartão de débito' } value="Cartão de débito">
            Cartão de débito
          </option>
        </select>
      </label>
    );
  }

  expenseTag() {
    const { editExpense: { tag } } = this.props;
    return (
      <label htmlFor="tag">
        tag:
        <select
          id="tag"
          name="tag"
          onChange={ ({ target }) => this.handleChange(target) }
          selected={ tag }
        >
          <option selected={ tag === '' } value="">Tipo de despesa</option>
          <option selected={ tag === 'Lazer' } value="Lazer">Lazer</option>
          <option selected={ tag === 'Trabalho' } value="Trabalho">Trabalho</option>
          <option selected={ tag === 'Transporte' } value="Transporte">Transporte</option>
          <option selected={ tag === 'Saúde' } value="Saúde">Saúde</option>
          <option
            selected={ tag === 'Alimentação' }
            value="Alimentação"
          >
            Alimentação
          </option>
        </select>
      </label>
    );
  }

  handleChange({ name, value }) {
    this.setState({ [name]: value });
  }

  submitButton() {
    const { description, value, currency, method, tag } = this.state;
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

  editButton() {
    const { add, editExpense: {
      id, description, value, currency, method, tag, exchangeRates,
    } } = this.props;
    const expenses = {
      id,
      description,
      value,
      currency,
      method,
      tag,
      exchangeRates,
      isEditind: false,

    };
    add(expenses);
  }

  buttonCreator(isEditind) {
    return (
      !isEditind
        ? (
          <input
            type="button"
            name="add-expense"
            value="Adicionar despesa"
            onClick={ () => this.submitButton() }
          />
        )
        : (
          <input
            type="button"
            name=""
            value="Editar gasto"
            onClick={ () => this.editButton() }
          />
        )
    );
  }

  render() {
    const { editExpense: { isEditind } } = this.props;
    return (
      <form className="expenses-form">
        {this.expenseTag()}
        {this.description()}
        {this.expenseValue()}
        {this.currency()}
        {this.paymentMethod()}
        {this.buttonCreator(isEditind)}
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  walletExpenses: state.wallet.expenses,
  editExpense: state.wallet.editExpense,
});

const mapDispatchToProps = (dispatch) => ({
  APICurrency: () => dispatch(fetchCurrency()),
  add: (expenses, currencies) => dispatch(addExpense(expenses, currencies)),
});

ExpensesForm.propTypes = {
  APICurrency: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  walletExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  currencies: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
