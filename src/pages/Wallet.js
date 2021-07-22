import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense } from '../actions';
import TableRender from '../components/TableRender';
import Header from '../components/Header';
import Expenses from '../components/ExpensesForm';

class Wallet extends Component {
  render() {
    return (
      <div>
        <Header />
        <TableRender />
        <Expenses />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  loading: state.wallet.loading,
});

const mapDispatchToProps = (dispatch) => ({
  addexpense: (data) => dispatch(addExpense(data)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
