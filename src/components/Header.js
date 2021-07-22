import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { emailStoreGet, expenses } = this.props;
    return (
      <header>
        <h4>Name</h4>
        <span data-testid="email-field">{ emailStoreGet }</span>
        <h5>
          <span data-testid="total-field">
            {
              expenses.reduce((acc, curr) => {
                const value = Number(curr.value);
                const rate = Number(curr.exchangeRates[curr.currency].ask);
                return acc + value * rate;
              }, 0)
            }
          </span>
        </h5>
        <h5>
          <span data-testid="header-currency-field">BRL</span>
        </h5>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  emailStoreGet: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  emailStoreGet: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
};
