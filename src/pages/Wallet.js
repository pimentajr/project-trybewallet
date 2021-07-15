import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Form from './Form';

class Wallet extends React.Component {
  render() {
    const { getUser, expenses } = this.props;
    const getTheExpense = expenses
      .map((value) => Number(value
        .exchangeRates[value.currency].ask) * Number(value.value));
    return (
      <div>
        TrybeWallet
        <div>{ this.fetchCoins }</div>
        <header>
          <div data-testid="email-field">
            { getUser }
          </div>
          <div data-testid="total-field">
            Total:
            { getTheExpense.reduce((acc, sum) => {
              acc += sum;
              return acc;
            }, 0)}
          </div>
          <div data-testid="header-currency-field">
            BRL
          </div>
        </header>
        <div>
          <section>
            <Form />
          </section>
        </div>
      </div>
    );
  }
}

Wallet.propTypes = ({
  getUser: PropTypes.string,
}).isRequired;

const mapStateToProps = (state) => ({
  getUser: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Wallet);
