import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from './Form';
import Header from '../components/Header';
import Table from '../components/Table';
import { fetchApi } from '../actions';

class Wallet extends Component {
  render() {
    const { getData, expenses } = this.props;
    getData();
    const reducerExpenses = () => {
      const total = expenses.reduce((acc, { exchangeRates, currency, value }) => (
        acc + (Number(exchangeRates[currency].ask) * Number(value))
      ), 0);
      return total.toFixed(2);
    };

    return (
      <div>
        <h3>TrybeWallet</h3>
        <Header total={ reducerExpenses() } />
        <Form />
        <Table />
      </div>
    );
  }
}

const mapDisptchToProps = (dispatch) => ({
  getData: () => dispatch(fetchApi()),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  getData: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps, mapDisptchToProps)(Wallet);
