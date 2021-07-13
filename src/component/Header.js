import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { showMail, expensesResult } = this.props;
    const noExpenses = () => {
      if (expensesResult.length === 0) {
        return true;
      }
      return false;
    };

    return (
      <div>
        <header>
          <p data-testid="email-field">
            Email:
            { showMail }
          </p>
          <section data-testid="total-field">
            Despesas total:
            {
              // O colega Jose Henrique me ajudou com esta lógica
              noExpenses() ? 0 : expensesResult.reduce((acc, expense) => {
                const conversion = Number(expense.exchangeRates[expense.currency].ask);
                acc += parseFloat(conversion) * parseFloat(Number(expense.value));
                return acc;
              }, 0).toFixed(2)
            }
          </section>
          <p data-testid="header-currency-field">BRL</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  showMail: state.user.email,
  expensesResult: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  showMail: PropTypes.func,
}.isRequired;
