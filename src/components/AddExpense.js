import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CurrencieToAdd from './CurrencieToAdd';
import DescriptionToAdd from './DescriptionToAdd';
import PaymentMethodToAdd from './PaymentMethodToAdd';
import TagToAdd from './TagToAdd';
import ValueToAdd from './ValueToAdd';
import { expenseAction, getCurrencies } from '../actions';

class AddExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleClick = this.handleClick.bind(this);
    this.saveOnState = this.saveOnState.bind(this);
  }

  handleClick() {
    const expense = Object.values(this.state);
    const { fetchCurrencies, saveExpenses } = this.props;
    fetchCurrencies();
    saveExpenses(expense);
  }

  saveOnState(element) {
    const { target } = element;
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <form className="addExpense">
        <DescriptionToAdd handleInfo={ this.saveOnState } />
        <CurrencieToAdd handleInfo={ this.saveOnState } />
        <PaymentMethodToAdd handleInfo={ this.saveOnState } />
        <TagToAdd handleInfo={ this.saveOnState } />
        <ValueToAdd handleInfo={ this.saveOnState } />
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Add Expense
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(getCurrencies()),
  saveExpenses: (expense) => dispatch(expenseAction(expense)),
});

AddExpense.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
  saveExpenses: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(AddExpense);
