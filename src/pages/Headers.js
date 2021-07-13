import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Headers extends React.Component {
  render() {
    const { login, sendExp } = this.props;
    const totalPrice = sendExp.reduce((acc, { exchangeRates, value, currency }) => (
      acc + (Number(exchangeRates[currency].ask * value))), 0);

    return (
      <header>
        <h4 data-testid="email-field">{login}</h4>
        <h3 className="header-total" data-testid="header-currency-field">
          Despesa Total R$
          <span key="login" data-testid="total-field">{ totalPrice || 0 }</span>
          BRL
        </h3>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  login: state.user.email,
  sendExp: state.wallet.expenses,
  currency: state.wallet.currencies,
});

Headers.propTypes = {
  login: PropTypes.string,
  sendExp: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, null)(Headers);
