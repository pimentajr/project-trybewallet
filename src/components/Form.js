import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, addExpenses } from '../actions';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.btnAddExpense = this.btnAddExpense.bind(this);
    this.renderPaymentMethod = this.renderPaymentMethod.bind(this);
    this.renderTags = this.renderTags.bind(this);
  }

  componentDidMount() {
    const { getCurrency } = this.props;
    getCurrency();
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  btnAddExpense() {
    const { getCurrency, expenses } = this.props;
    this.setState((previusState) => ({
      id: previusState.id + 1,
    }));
    expenses(this.state);
    getCurrency();
  }

  // criando novos renders por conta da quantidade de linha excedida
  renderPaymentMethod() {
    const methodPayment = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    return (
      <label htmlFor="method">
        Método de Pagamento:
        <select name="method" id="method" onChange={ this.handleChange }>
          {methodPayment
            .map((payment, index) => <option key={ index }>{payment}</option>)}
        </select>
      </label>
    );
  }

  renderTags() {
    const tagOption = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <label htmlFor="tag">
        Tag
        <select
          name="tag"
          id="tag"
          onChange={ this.handleChange }
        >
          {tagOption
            .map((category, index) => <option key={ index }>{category}</option>)}
        </select>
      </label>
    );
  }

  render() {
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            type="text"
            id="value"
            name="value"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            id="description"
            name="description"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select id="currency" name="currency" onChange={ this.handleChange }>
            { Object.keys(currencies)
              .filter((elem) => elem !== 'USDT')
              .map((currencie, index) => <option key={ index }>{ currencie }</option>) }
          </select>
        </label>
        { this.renderPaymentMethod() }
        { this.renderTags() }
        <button
          type="button"
          onClick={ this.btnAddExpense }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrency: () => dispatch(fetchCurrencies()),
  expenses: (expense) => dispatch(addExpenses(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  getCurrency: PropTypes.func,
}.isRequired;
