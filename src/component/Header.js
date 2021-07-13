import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  sumTot() {
    const { expensesResult } = this.props;
    let sum = 0;
    expensesResult.forEach(({ value, currency, exchangeRates }) => {
      sum += exchangeRates[currency].ask * value;
    });
    return sum.toFixed(2);
  }

  render() {
    const { showMail } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">
            Email:
            { showMail }
          </p>
          <p data-testid="total-field">
            Despesas total R$
            { this.sumTot }
          </p>
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
