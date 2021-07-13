import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Header extends Component {
  render() {
    const { getEmail, totalExpense } = this.props;
    const eachValue = totalExpense
      .map(({ exchangeRates, currency, value }) => (
        exchangeRates[currency].ask * Number(value)
      ));
    return (
      <div className="header">
        <h1>Wallet</h1>
        <h5 data-testid="email-field">{getEmail}</h5>
        <div className="flex flex-end">
          <p data-testid="total-field">
            Despesa Total:
            {' '}
            {
              eachValue
                .reduce((acc, curr) => acc + Number(curr), 0).toFixed(2)
            }
            {' '}
            <span data-testid="header-currency-field">BRL</span>
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getEmail: state.user.email,
  totalExpense: state.wallet.expenses,
});

Header.propTypes = {
  getEmail: PropTypes.string.isRequired,
  totalExpense: PropTypes
    .arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
};

export default connect(mapStateToProps)(Header);
