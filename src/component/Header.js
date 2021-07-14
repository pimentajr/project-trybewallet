import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, currencies, expenses } = this.props;
    return (
      <header>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">{ currencies - expenses }</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.number,
  currencies: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);
