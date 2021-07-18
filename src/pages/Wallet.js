import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddExpense from '../components/AddExpense';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <header
          data-testid="email-field"
        >
          { email }
        </header>
        <div
          data-testid="total-field"
        >
          0
        </div>
        <div
          data-testid="header-currency-field"
        >
          BRL
        </div>
        <AddExpense />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
