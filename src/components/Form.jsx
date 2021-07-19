import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setCoins, addExpenses } from '../actions';
import ExtendsForms from './ExtendsForms';
import ExpensesTable from './ExpensesTable';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleInput = this.handleInput.bind(this);
    this.btnAddExpenses = this.btnAddExpenses.bind(this);
  }

  componentDidMount() {
    const { moeda } = this.props;
    moeda();
  }

  handleInput({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  btnAddExpenses(e) {
    e.preventDefault();
    const { expenses, expense, currencies, moeda } = this.props;
    moeda();
    const { value, description, method, currency, tag } = this.state;
    expenses({
      id: expense.length,
      value,
      description,
      method,
      currency,
      tag,
      exchangeRates: currencies,
    });
  }

  render() {
    const { value, description, method, currency, tag } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <label
          htmlFor="valorInput"
        >
          Valor:
          <input
            type="number"
            id="valorInput"
            name="value"
            value={ value }
            onChange={ (e) => this.handleInput(e) }
          />
        </label>
        <label htmlFor="descriptionInput">
          Descrição:
          <input
            type="text"
            id="descriptionInput"
            name="description"
            value={ description }
            onChange={ (e) => this.handleInput(e) }
          />
        </label>

        <ExtendsForms
          method={ method }
          currency={ currency }
          tag={ tag }
          currencies={ currencies }
          handleInput={ this.handleInput }
        />

        <button
          type="button"
          onClick={ (e) => this.btnAddExpenses(e) }
        >
          Adicionar despesa
        </button>

        <ExpensesTable />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expense: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  moeda: (state) => dispatch(setCoins(state)),
  expenses: (state) => dispatch(addExpenses(state)),
});

Form.propTypes = {
  value: PropTypes.number,
  description: PropTypes.string,
  currency: PropTypes.string,
  method: PropTypes.string,
  tag: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Form);
