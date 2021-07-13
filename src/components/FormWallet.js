import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ExpenseAmount from './ExpenseAmount';
import ExpenseDescription from './ExpenseDescription';
import SelectedTypeCoin from './SelectedTypeCoin';
import PaymentType from './PaymentType';
import CategoryTagExpense from './CategoryTagExpense';
import ButtonAddExpense from './ButtonAddExpense';
import { fetchExpense } from '../actions';

class FormWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      currency: 'USD',
      tag: 'Alimentação',
      description: '',
      method: 'Dinheiro',
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitButtonId = this.submitButtonId.bind(this);
  }

  submitButtonId() {
    const { expenses, fetchApiExpense } = this.props;
    let id = 0;
    if (expenses.length > 0) {
      id = expenses[expenses.length - 1].id + 1;
    }

    fetchApiExpense({ ...this.state, id });
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
      tag,
      id } = this.state;
    const funcHandleState = this.handleChange;
    const infos = {
      value,
      description,
      currency,
      method,
      tag,
      id,
      funcHandleState,
    };
    const { fetchApiExpense } = this.props;
    return (
      <form>
        <ExpenseAmount myValue={ infos } />
        <ExpenseDescription myValue={ infos } />
        <SelectedTypeCoin myValue={ infos } />
        <PaymentType myValue={ infos } />
        <CategoryTagExpense myValue={ infos } />
        <ButtonAddExpense
          fetchApiExpense={ fetchApiExpense }
          submitButtonId={ this.submitButtonId }
        />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApiExpense: (obj) => dispatch(fetchExpense(obj)),
});

FormWallet.propTypes = {
  fetchApiExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormWallet);
