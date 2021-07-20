import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchExpenses } from '../actions';
import Table from './Table';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stateForm: {
        id: 0,
        value: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: '',
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.setExpenses = this.setExpenses.bind(this);
    this.inputValue = this.inputValue.bind(this);
    this.inputDescription = this.inputDescription.bind(this);
    this.selectMoeda = this.selectMoeda.bind(this);
    this.selectMethod = this.selectMethod.bind(this);
    this.selectTag = this.selectTag.bind(this);
  }

  async setExpenses() {
    const { expenses } = this.props;
    const { stateForm: { value }, stateForm } = this.state;
    await expenses(stateForm, value);
    this.setState((prevState) => ({
      stateForm: {
        id: prevState.stateForm.id + 1,
        value: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: '',
      },
    }));
  }

  handleChange({ target: { name, value } }) {
    this.setState((prevState) => ({
      stateForm: { ...prevState.stateForm, [name]: value },
    }));
  }

  inputValue() {
    const { stateForm: { value } } = this.state;
    const input = (
      <label htmlFor="value">
        Valor
        <input
          id="value"
          type="text"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
      </label>);
    return input;
  }

  inputDescription() {
    const { stateForm: { description } } = this.state;
    const input = (
      <label htmlFor="description">
        Descrição
        <input
          id="description"
          type="text"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
      </label>);
    return input;
  }

  selectMoeda() {
    const { currencies } = this.props;
    const { stateForm: { currency } } = this.state;
    const select = (
      <label htmlFor="moeda">
        Moeda
        <select
          id="moeda"
          name="currency"
          onChange={ this.handleChange }
          value={ currency }
        >
          {currencies
            .map((currencie, index) => (
              <option key={ index } value={ currencie }>{ currencie }</option>))}
        </select>
      </label>);
    return select;
  }

  selectMethod() {
    const { stateForm: { method } } = this.state;
    const select = (
      <label htmlFor="método de pagamento">
        Método de pagamento
        <select
          id="método de pagamento"
          name="method"
          onChange={ this.handleChange }
          value={ method }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>);
    return select;
  }

  selectTag() {
    const { stateForm: { tag } } = this.state;
    const select = (
      <label htmlFor="tag">
        Tag
        <select
          id="tag"
          name="tag"
          onChange={ this.handleChange }
          value={ tag }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>);
    return select;
  }

  render() {
    return (
      <>
        <form>
          { this.inputValue() }
          { this.inputDescription() }
          { this.selectMoeda() }
          { this.selectMethod() }
          { this.selectTag() }
          <button
            type="button"
            onClick={ this.setExpenses }
          >
            Adicionar despesa
          </button>
        </form>
        <Table />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  expenses: (stateForm, value) => dispatch(fetchExpenses(stateForm, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.func.isRequired,
};
