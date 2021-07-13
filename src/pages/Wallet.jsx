import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpenseForm from './components/ExpenseForm';

class Wallet extends React.Component {

  sumExpenses() {
    const { userExpenses } = this.props;

    let sum = 0;
    if (userExpenses) {
      userExpenses.forEach((item) => {
        const currency = item.currency;
        const amount = item.exchangeRates[currency].ask;

        sum += Math.round((parseInt(item.value, 10) * amount) * 100) / 100;
        return 0;
      });
    }

    return sum;
  }

  render() {
    const { userEmail, userExpenses } = this.props;

    return (
      <div>
        <header>
          TrybeWallet
          <div>
            <div data-testid="email-field">
              Email:
              {' '}
              { userEmail }
            </div>
            <div>
              Dispesa Total:

              <span
                data-testid="total-field"
              >
                { this.sumExpenses() }
              </span>
              <span data-testid="header-currency-field"> BRL </span>
            </div>
          </div>
        </header>

        <ExpenseForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  userExpenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
};
