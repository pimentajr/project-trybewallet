import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import calculateTotalExpenses from '../../helpers/calculateTotal';
import trybeLogo from '../../images/Trybe_logo.png';

class Header extends Component {
  render() {
    const { userEmail, expenses } = this.props;
    const totalExpense = expenses.length > 0
      ? calculateTotalExpenses(expenses) : 0;
    return (
      <header>
        <img src={ trybeLogo } alt="Wallet logo" />
        <div>
          <span
            data-testid="email-field"
          >
            { `Email: ${userEmail}` }
          </span>
          <span>
            Despesa Total: R$
            <span
              data-testid="total-field"
            >
              { totalExpense }
            </span>
            <span
              data-testid="header-currency-field"
            >
              BRL
            </span>
          </span>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);
