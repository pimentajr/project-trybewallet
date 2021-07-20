import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from './Form';
import { fetchAPI } from '../actions';
import Table from './Table';

class Wallet extends React.Component {
  componentDidMount() {
    const { requestApi } = this.props;
    requestApi();
  }

  getTotal() {
    const { expenses } = this.props;
    let total = 0;
    if (expenses.length > 0) {
      expenses.forEach(({ value, currency, exchangeRates }) => {
        total += (Number(exchangeRates[currency].ask) * Number(value)).toFixed(2);
      });
    }
    return total;
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <div>
            TrybeWallet
          </div>
          <h1 data-testid="email-field">{`Olá ${email}`}</h1>
          <span data-testid="total-field">{ `Total despesas: ${this.getTotal()} ` }</span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <Form />
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  requestApi: () => dispatch(fetchAPI()),
});

Wallet.propTypes = {
  requestApi: PropTypes.func,
  dispatchExpenses: PropTypes.func,
}.isRequest;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
