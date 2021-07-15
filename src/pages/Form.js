import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editExpenses } from '../actions';

class Form extends Component {
  constructor(props) {
    super(props);
    const { expensesReducer } = this.props;
    this.state = {
      id: expensesReducer.length,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleFetch = this.handleFetch.bind(this);
    this.getExpenses = this.getExpenses.bind(this);
  }

  componentDidMount() {
    this.handleFetch();
    const { editExpensesAction } = this.props;
    editExpensesAction(this.getExpenses);
  }

  getExpenses(param) {
    const { expensesReducer } = this.props;
    const findExpense = expensesReducer.find(({ id }) => id === param.id);
    this.setState({
      id: findExpense.id,
      value: findExpense.value,
      description: findExpense.description,
      currency: findExpense.currency,
      method: findExpense.method,
      tag: findExpense.tag,
      exchangeRates: findExpense.exchangeRates,
    });
  }

  async handleFetch() {
    const { callApi } = this.props;
    const { response } = await callApi();
    console.log(response);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { callApi, expensesReducer } = this.props;
    callApi(this.state);
    this.setState({
      id: expensesReducer.length + 1,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    });
  }

  renderSelects() {
    const { currencies } = this.props;
    const { currency, method, tag } = this.state;
    return (
      <>
        <label htmlFor="currency">
          Moeda
          <select
            name="currency"
            id="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            { currencies && currencies
              .map((curr, index) => (
                <option value={ curr } key={ index }>{ curr }</option>))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento
          <select
            name="method"
            id="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select
            name="tag"
            id="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </>
    );
  }

  render() {
    const { value, description } = this.state;
    return (
      <form>
        <label htmlFor="value">
          Valor
          <input
            type="text"
            name="value"
            id="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            type="text"
            name="description"
            id="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        {this.renderSelects()}
        <button
          type="button"
          data-testid="delete-btn"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  // updateExpensesAction: (obj) => dispatch(updateExpenses(obj)),
  editExpensesAction: (edit) => dispatch(editExpenses(edit)),
});

Form.propTypes = ({
  callApi: PropTypes.func,
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Form);
