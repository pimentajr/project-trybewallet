import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpenseForm from './components/ExpenseForm';

class Wallet extends React.Component {
  render() {
    const { userEmail } = this.props;

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
                0
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
