import React, { Component } from 'react';
import ExpenseAmount from './ExpenseAmount';
import ExpenseDescription from './ExpenseDescription';
import SelectedTypeCoin from './SelectedTypeCoin';
import PaymentType from './PaymentType';
import CategoryTagExpense from './CategoryTagExpense';
import ButtonAddExpense from './ButtonAddExpense';
import { connect } from 'react-redux';
import { fetchExpense } from '../actions'

class FormWallet extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag } = this.state;
    const funcHandleState = this.handleChange;
    const infos = {
      value,
      description,
      currency,
      method,
      tag,
      funcHandleState,
    };
    const { exec } = this.props;
    return (
      <form>
        <ExpenseAmount myValue={ infos } />
        <ExpenseDescription myValue={ infos } />
        <SelectedTypeCoin myValue={ infos } />
        <PaymentType myValue={ infos } />
        <CategoryTagExpense myValue={ infos } />
        <ButtonAddExpense dataExpense={ this.state } sendFunc={ exec } />
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  exec: (obj) => dispatch(fetchExpense(obj)),
});

export default connect(null, mapDispatchToProps)(FormWallet);
