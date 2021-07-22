import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      totall: 0,
    };
    const { totall } = this.state;
    console.log(totall);
  }

  render() {
    const { email, expenses } = this.props;
    const test = expenses.length > 0 ? expenses
      .map((e) => e.exchangeRates[e.currency].ask * e.value)
      .reduce((e, a) => parseFloat(e) + parseFloat(a)) : 0;
    return (
      <div>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">
          { test }
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  map: PropTypes.func,
  tableList: PropTypes.arrayOf,
}.isRequired;

export default connect(mapStateToProps)(Header);
