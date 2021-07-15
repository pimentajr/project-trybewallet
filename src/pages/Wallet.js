import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../component/Layout';
import withStore from '../utils/withStore';
import { Header, Select } from '../component/Login';
import {
  addNewExpense as addNewExpenseAgent,
  editExpense as editExpenseAgent,
  updateCurrencies as updateCurrenciesAgent } from '../agents';
import stateClone from '../utils/stateClone';

const initialState = {
  currentForm: {
    value: 0,
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  },
  expenseBeingEdited: null,
};

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.startEdit = this.startEdit.bind(this);
  }

  componentDidMount() {
    const { updateCurrencies } = this.props;
    updateCurrencies();
  }

  handleInputChange({ target }) {
    const { name, value } = target;

    this.setState((previousState) => {
      const nextState = stateClone(previousState);
      nextState.currentForm[name] = value;
      return nextState;
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { addNewExpense, editExpense } = this.props;
    const { currentForm, expenseBeingEdited } = this.state;
    if (expenseBeingEdited) {
      editExpense(currentForm);
      return;
    }

    addNewExpense(currentForm);
  }

  startEdit(expense) {
    this.setState((previous) => {
      const nextState = stateClone(previous);
      nextState.currentForm = expense;
      nextState.expenseBeingEdited = expense;
      return nextState;
    });
  }

  renderSelects() {
    const { wallet } = this.props;
    const { currentForm } = this.state;
    const { currency, method, tag } = currentForm;
    const currencyList = Object.keys(wallet.currencies).filter(
      (cur) => cur !== 'USDT',
    );

    return (
      <>
        <Select
          id="expense-currency"
          name="currency"
          value={ currency }
          handleChange={ this.handleInputChange }
          options={ currencyList }
          label="Moeda"
          testid="currency-input"
        />

        <Select
          id="expense-method"
          name="method"
          value={ method }
          handleChange={ this.handleInputChange }
          options={ ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'] }
          label="Método de pagamento"
          testid="method-input"
        />

        <Select
          id="expense-tag"
          name="tag"
          value={ tag }
          handleChange={ this.handleInputChange }
          options={ ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'] }
          label="Tag"
          testid="tag-input"
        />
      </>
    );
  }

  render() {
    const { currentForm, expenseBeingEdited } = this.state;
    const { value, description } = currentForm;

    return (
      <Layout title="Minha Carteira">
        <Header />
        <main>
          opa
          <form onSubmit={ this.handleSubmit }>
            <label htmlFor="expense-value">
              Valor
              <input
                id="expense-value"
                type="number"
                name="value"
                value={ value }
                onChange={ this.handleInputChange }
                data-testid="value-input"
              />
            </label>

            <label htmlFor="expense-description">
              Descrição
              <input
                id="expense-description"
                type="text"
                name="description"
                value={ description }
                onChange={ this.handleInputChange }
                data-testid="description-input"
              />
            </label>

            {this.renderSelects()}
            <button type="submit">
              { expenseBeingEdited ? 'Editar Despesa' : 'Adicionar despesa' }
            </button>
            {' '}

          </form>
        </main>
      </Layout>
    );
  }
}

Wallet.propTypes = {
  updateCurrencies: PropTypes.func,
  addNewExpenseAgent: PropTypes.func,
  editExpenseAgent: PropTypes.func,
  wallet: PropTypes.shape({
    currencies: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      }),
    ),
  }),
}.isRequired;

export default withStore(
  Wallet, ['wallet'], [addNewExpenseAgent, editExpenseAgent, updateCurrenciesAgent],
);
