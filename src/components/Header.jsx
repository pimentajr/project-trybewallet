import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Lógica da soma dos valores desenvolvida
// a partir  Lara-Capila - Turma 10 - Tribo B.
// https://github.com/tryber/sd-010-b-project-trybewallet/tree/lara-capila-wallet

class Header extends React.Component {
  constructor() {
    super();
    this.totalExpenses = this.totalExpenses.bind(this);
  }

  totalExpenses() {
    const { expensesFromState } = this.props;
    const expensesSum = expensesFromState.reduce(
      (accumulator, previousValue) => accumulator + (previousValue
        .exchangeRates[previousValue.currency]
        .ask * previousValue.value), 0,
    );
    return parseFloat(expensesSum).toFixed(2);
  }

  render() {
    const { storeEmail } = this.props;
    return (
      <header>
        <p data-testid="email-field">{ storeEmail }</p>
        <p data-testid="total-field">{this.totalExpenses()}</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  storeEmail: state.user.email,
  expensesFromState: state.wallet.expenses,
});

Header.propTypes = ({
  storeEmail: PropTypes.string,
}).isRequired;

export default connect(mapStateToProps, null)(Header);
