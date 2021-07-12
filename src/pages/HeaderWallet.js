import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class HeaderWallet extends React.Component {
  render() {
    const { emailState, expenses } = this.props;
    // Referencia: https://github.com/tryber/sd-011-project-trybewallet/pull/73/files
    // do Cesar Bhering
    const total = expenses.length > 0
      ? expenses.reduce((acc, curr) => {
        console.log(curr.exchangeRates[curr.currency].ask);
        return (acc + curr.value * curr.exchangeRates[curr.currency].ask);
      }, 0) : 0;

    return (
      <header>
        <h3 data-testid="email-field">
          {emailState}
        </h3>
        <p data-testid="header-currency-field">BRL</p>
        <p data-testid="total-field">{total}</p>
      </header>
    );
  }
}

HeaderWallet.propTypes = {
  emailState: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  emailState: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(HeaderWallet);
